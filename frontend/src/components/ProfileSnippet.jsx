import React from "react";

function ProfileSnippet({ title, titles, body }) {
    // Handle both array and single string for body
    const bodyArray = Array.isArray(body) ? body : [body];
    // Handle titles array - if not provided, use empty array
    const titlesArray = Array.isArray(titles) ? titles : [];

    return (
        <div className="profile-snippet">
            <div className={`title-container`}>
                <div className="vertical-line"></div>
                <h2>{title}</h2>
            </div>
            <div className="profile-text-sections">
                {bodyArray.map((text, index) => (
                    <div key={index} className="profile-section">
                        {titlesArray[index] && (
                            <h3 className="section-title">{titlesArray[index]}</h3>
                        )}
                        <div 
                            className="profile-section-text"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileSnippet;
