import React from "react";

function ProfileSnippet({ title, body }) {
    // Handle both array and single string for body
    const bodyArray = Array.isArray(body) ? body : [body];

    return (
        <div className="profile-snippet">
            <div className={`title-container`}>
                <div className="vertical-line"></div>
                <h2>{title}</h2>
            </div>
            <div className="profile-text-sections">
                {bodyArray.map((text, index) => (
                    <div key={index} className="profile-section-text">
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileSnippet;
