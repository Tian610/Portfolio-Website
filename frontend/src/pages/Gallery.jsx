import React, { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import { Center } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function Gallery() {
    const [images, setImages] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();
    const storageAccountName = "tiansgallery";
    const containerName = "image-gallery";

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/`);
                const containerClient = blobServiceClient.getContainerClient(containerName);

                const blobsWithMetadata = [];
                for await (const blob of containerClient.listBlobsFlat()) {
                    const url = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`;
                    blobsWithMetadata.push({
                        url: url,
                        lastModified: blob.properties.lastModified
                    });
                }
                
                // Sort by most recent first (descending order)
                blobsWithMetadata.sort((a, b) => b.lastModified - a.lastModified);
                
                // Extract just the URLs after sorting
                const sortedUrls = blobsWithMetadata.map(blob => blob.url);
                setImages(sortedUrls);
            } catch (err) {
                console.log("Error listing blobs", err.message);
            }
        };
        fetchImages();
    }, []);

    // 3D tilt effect for gallery images (runs after images are loaded)
    useEffect(() => {
        const galleryImages = document.querySelectorAll('.galleryImage');
        
        const handleMouseMove = function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            this.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        };
        
        const handleMouseLeave = function() {
            this.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        };
        
        galleryImages.forEach(image => {
            image.addEventListener('mousemove', handleMouseMove);
            image.addEventListener('mouseleave', handleMouseLeave);
        });
        
        // Cleanup
        return () => {
            galleryImages.forEach(image => {
                image.removeEventListener('mousemove', handleMouseMove);
                image.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [images]); // Run this effect when images change

    useEffect(() => {
    const handleKeyDown = (e) => {
        if (selectedIndex === null) return;

        if (e.key === "Escape") {
        setSelectedIndex(null);
        } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % images.length);
        } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, images.length]);

    const goToHome = () => {
        navigate('/');
    };
    
    return (
        <>
            <section id="gallery">
                <div className="header">
                    <div className="gallery-title-container">
                        <div className="vertical-line"></div>
                        <div >
                            <h2>Gallery</h2>
                            <p className="Akeila-text">Digital Illustrations</p>
                        </div>
                    </div>
                    <button onClick={goToHome} className="nav-link">
                        Home
                    </button>
                </div>
                    <div className="imageGalleryContainer">
                        {images.map((url, idx) => (
                            <div className="galleryImage" key={idx} onClick={() => setSelectedIndex(idx)}>
                                <img src={url} alt={`blob-${idx}`} />
                            </div>
                        ))}
                    </div>
                    
                    {selectedIndex !== null && (
                        <div className="modalOverlay" onClick={() => setSelectedIndex(null)}>
                            <img src={images[selectedIndex]} alt="enlarged" className="modalImage" />

                            <div className="imageNavigator">
                                <button 
                                className="navButton left" 
                                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + images.length) % images.length); }}
                                >&lt;</button>

                                <div className="thumbnailContainer">
                                    <img src={images[(selectedIndex - 4 + images.length) % images.length]} alt="previous image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 4 + images.length) % images.length); }}></img>
                                    <img src={images[(selectedIndex - 3 + images.length) % images.length]} alt="previous image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 3 + images.length) % images.length); }}></img>
                                    <img src={images[(selectedIndex - 2 + images.length) % images.length]} alt="previous image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 2 + images.length) % images.length); }}></img>
                                    <img src={images[(selectedIndex - 1 + images.length) % images.length]} alt="previous image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + images.length) % images.length); }}></img>
                                    <img src={images[(selectedIndex) % images.length]} alt="current image" className="thumbnail active"></img>
                                    <img src={images[(selectedIndex + 1) % images.length]} alt="next image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % images.length); }}></img>
                                    <img src={images[(selectedIndex + 2) % images.length]} alt="next image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 2) % images.length); }}></img>
                                    <img src={images[(selectedIndex + 3) % images.length]} alt="next image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 3) % images.length); }}></img>
                                    <img src={images[(selectedIndex + 4) % images.length]} alt="next image" className="thumbnail"
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 4) % images.length); }}></img>

                                </div>
                                
                                <button 
                                className="navButton right" 
                                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % images.length); }}
                                >&gt;</button>
                            </div>
                            
                        </div>
                        )}
            </section>
        </>
    )
}

export default Gallery;
