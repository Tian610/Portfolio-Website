import React, { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import { Center } from "@react-three/drei";

function Gallery() {
    const [images, setImages] = useState([]);
    const storageAccountName = "tiansgallery";
    const containerName = "image-gallery";

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/`);
                const containerClient = blobServiceClient.getContainerClient(containerName);

                const urls = [];
                for await (const blob of containerClient.listBlobsFlat()) {
                    const url = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`;
                    urls.push(url);
                }
                setImages(urls);
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

    return (
        <>
            <section id="gallery">
                <div className="header">
                    <p className="section__text__p3">An Art Showcase</p>
                    <h1 className="title">Gallery</h1>
                </div>
                    <div className="imageGalleryContainer">
                        {images.map((url, idx) => (
                            <div className="galleryImage" key={idx}>
                                <img src={url} alt={`blob-${idx}`} />
                            </div>
                        ))}
                    </div>
            </section>
        </>
    )
}

export default Gallery;
