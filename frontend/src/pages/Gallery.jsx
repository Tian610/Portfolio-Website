import React, { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

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

    return (
        <>
            <section id="gallery">
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
