import React, { useEffect, useRef } from 'react';

const PerlinBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const initBackground = async () => {
      try {
        // Import Perlin noise dynamically
        const ChriscoursesPerlinNoise = await import("https://esm.sh/@chriscourses/perlin-noise");

        //Editable values - Optimized for performance
        let showFPS = false;
        let MAX_FPS = 1; // Cap at 30fps for better performance
        let thresholdIncrement = 5; // Increased from 5 to reduce lines
        let thickLineThresholdMultiple = 2;
        let res = 16; // Increased from 8 to reduce grid density
        let baseZOffset = 0.001; // Slightly faster animation
        let lineColor = '#EDEDED15'; // Even more subtle
        
        let canvas = canvasRef.current;
        if (!canvas) return;
        
        let ctx = canvas.getContext('2d');
        let frameValues = [];
        let inputValues = [];
        let currentThreshold = 0;
        let cols = 0;
        let rows = 0;
        let zOffset = 0;
        let zBoostValues = [];
        let noiseMin = 100;
        let noiseMax = 0;
        let mousePos = { x: -99, y: -99 };
        let mouseDown = false;
        let enableMouseInteraction = false; // Disabled for better performance

        function setupCanvas() {
          if (!canvas || !ctx) return;
          
          canvasSize();
          window.addEventListener('resize', canvasSize);
          
          if (enableMouseInteraction) {
            canvas.addEventListener('mousemove', (e) => {
              const rect = canvas.getBoundingClientRect();
              mousePos = { 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top 
              };
            });
          }
        }

        function canvasSize() {
          if (!canvas || !ctx) return;
          
          const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
          canvas.width = rect.width * window.devicePixelRatio;
          canvas.height = rect.height * window.devicePixelRatio;
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
          canvas.style.width = rect.width + 'px';
          canvas.style.height = rect.height + 'px';
          cols = Math.floor(canvas.width / res) + 1;
          rows = Math.floor(canvas.height / res) + 1;
          
          // Initialize zBoostValues
          zBoostValues = [];
          for (let y = 0; y < rows; y++) {
            zBoostValues[y] = [];
            for (let x = 0; x <= cols; x++) {
              zBoostValues[y][x] = 0;
            }
          }
        }

        function animate() {
          if (!canvas || !ctx) return;
          
          const frameDelay = MAX_FPS > 0 ? 1000 / MAX_FPS : 0;
          
          setTimeout(() => {
            if (mouseDown && enableMouseInteraction) {
              mouseOffset();
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            zOffset += baseZOffset;
            generateNoise();
            
            // Reduce the number of threshold iterations for better performance
            const roundedNoiseMin = Math.floor(noiseMin / thresholdIncrement) * thresholdIncrement;
            const roundedNoiseMax = Math.ceil(noiseMax / thresholdIncrement) * thresholdIncrement;
            
            // Limit the number of iterations to prevent too much computation
            const maxIterations = 6;
            let iterations = 0;
            
            for (let threshold = roundedNoiseMin; threshold < roundedNoiseMax && iterations < maxIterations; threshold += thresholdIncrement) {
              currentThreshold = threshold;
              renderAtThreshold();
              iterations++;
            }
            
            noiseMin = 100;
            noiseMax = 0;
            
            animationRef.current = requestAnimationFrame(animate);
          }, frameDelay);
        }

        function mouseOffset() {
          let x = Math.floor(mousePos.x / res);
          let y = Math.floor(mousePos.y / res);
          if (!inputValues[y] || inputValues[y][x] === undefined) return;
          
          const incrementValue = 0.0025;
          const radius = 5;
          
          for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
              const distanceSquared = i * i + j * j;
              const radiusSquared = radius * radius;

              if (distanceSquared <= radiusSquared && zBoostValues[y + i]?.[x + j] !== undefined) {
                zBoostValues[y + i][x + j] += incrementValue * (1 - distanceSquared / radiusSquared);
              }
            }
          }
        }

        function generateNoise() {
          // Use larger noise scale for less detail but better performance
          const noiseScale = 0.03;
          
          for (let y = 0; y < rows; y++) {
            inputValues[y] = [];
            for (let x = 0; x <= cols; x++) {
              inputValues[y][x] = ChriscoursesPerlinNoise.noise(x * noiseScale, y * noiseScale, zOffset + (zBoostValues[y]?.[x] || 0)) * 100;
              if (inputValues[y][x] < noiseMin) noiseMin = inputValues[y][x];
              if (inputValues[y][x] > noiseMax) noiseMax = inputValues[y][x];
              if (zBoostValues[y]?.[x] > 0) {
                zBoostValues[y][x] *= 0.98; // Slightly faster decay
              }
            }
          }
        }

        function renderAtThreshold() {
          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = currentThreshold % (thresholdIncrement * thickLineThresholdMultiple) === 0 ? 2 : 1;

          for (let y = 0; y < inputValues.length - 1; y++) {
            for (let x = 0; x < inputValues[y].length - 1; x++) {
              if (inputValues[y][x] > currentThreshold && inputValues[y][x + 1] > currentThreshold && inputValues[y + 1][x + 1] > currentThreshold && inputValues[y + 1][x] > currentThreshold) continue;
              if (inputValues[y][x] < currentThreshold && inputValues[y][x + 1] < currentThreshold && inputValues[y + 1][x + 1] < currentThreshold && inputValues[y + 1][x] < currentThreshold) continue;
             
              let gridValue = binaryToType(
                inputValues[y][x] > currentThreshold ? 1 : 0,
                inputValues[y][x + 1] > currentThreshold ? 1 : 0,
                inputValues[y + 1][x + 1] > currentThreshold ? 1 : 0,
                inputValues[y + 1][x] > currentThreshold ? 1 : 0
              );

              placeLines(gridValue, x, y);
            }
          }
          ctx.stroke();
        }

        function placeLines(gridValue, x, y) {
          let nw = inputValues[y][x];
          let ne = inputValues[y][x + 1];
          let se = inputValues[y + 1][x + 1];
          let sw = inputValues[y + 1][x];
          let a, b, c, d;

          switch (gridValue) {
            case 1:
            case 14:
              c = [x * res + res * linInterpolate(sw, se), y * res + res];
              d = [x * res, y * res + res * linInterpolate(nw, sw)];
              line(d, c);
              break;
            case 2:
            case 13:
              b = [x * res + res, y * res + res * linInterpolate(ne, se)];
              c = [x * res + res * linInterpolate(sw, se), y * res + res];
              line(b, c);
              break;
            case 3:
            case 12:
              b = [x * res + res, y * res + res * linInterpolate(ne, se)];
              d = [x * res, y * res + res * linInterpolate(nw, sw)];
              line(d, b);
              break;
            case 11:
            case 4:
              a = [x * res + res * linInterpolate(nw, ne), y * res];
              b = [x * res + res, y * res + res * linInterpolate(ne, se)];
              line(a, b);
              break;
            case 5:
              a = [x * res + res * linInterpolate(nw, ne), y * res];
              b = [x * res + res, y * res + res * linInterpolate(ne, se)];
              c = [x * res + res * linInterpolate(sw, se), y * res + res];
              d = [x * res, y * res + res * linInterpolate(nw, sw)];
              line(d, a);
              line(c, b);
              break;
            case 6:
            case 9:
              a = [x * res + res * linInterpolate(nw, ne), y * res];
              c = [x * res + res * linInterpolate(sw, se), y * res + res];
              line(c, a);
              break;
            case 7:
            case 8:
              a = [x * res + res * linInterpolate(nw, ne), y * res];
              d = [x * res, y * res + res * linInterpolate(nw, sw)];
              line(d, a);
              break;
            case 10:
              a = [x * res + res * linInterpolate(nw, ne), y * res];
              b = [x * res + res, y * res + res * linInterpolate(ne, se)];
              c = [x * res + res * linInterpolate(sw, se), y * res + res];
              d = [x * res, y * res + res * linInterpolate(nw, sw)];
              line(a, b);
              line(c, d);
              break;
            default:
              break;
          }
        }

        function line(from, to) {
          ctx.moveTo(from[0], from[1]);
          ctx.lineTo(to[0], to[1]);
        }

        function linInterpolate(x0, x1, y0 = 0, y1 = 1) {
          if (x0 === x1) {
            return 0;
          }
          return y0 + ((y1 - y0) * (currentThreshold - x0)) / (x1 - x0);
        }

        function binaryToType(nw, ne, se, sw) {
          let a = [nw, ne, se, sw];
          return a.reduce((res, x) => (res << 1) | x);
        }

        // Initialize
        setupCanvas();
        animate();

      } catch (error) {
        console.error('Failed to load Perlin noise library:', error);
      }
    };

    initBackground();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none'
      }}
    />
  );
};

export default PerlinBackground;
