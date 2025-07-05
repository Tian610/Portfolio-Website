import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { noise } from "./Perlin";

const Terrain = () => {
  const mesh = useRef();

  // Create the procedural geometry only once using useMemo
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(25, 25, 75, 75);
    noise.seed(Math.random());
    let pos = g.attributes.position;
    let pa = pos.array;
    const hVerts = g.parameters.heightSegments + 1;
    const wVerts = g.parameters.widthSegments + 1;
    for (let j = 0; j < hVerts; j++) {
      for (let i = 0; i < wVerts; i++) {
        const ex = 1.1;
        const n =
          (noise.simplex2(i / 100, j / 100) +
            noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
            noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
            noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
            noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4)) /
          2;
        pa[3 * (j * wVerts + i) + 2] = n;
      }
    }
    pos.needsUpdate = true;
    g.computeVertexNormals(); // Recalculate normals for correct lighting
    return g;
  }, []);

  // Animate the mesh rotation
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhongMaterial
        color={"hotpink"}
        specular={"hotpink"}
        shininess={3}
        wireframe={true}
      />
    </mesh>
  );
};

export default Terrain;