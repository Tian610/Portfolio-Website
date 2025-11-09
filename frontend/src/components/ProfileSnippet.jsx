import React from "react";

function ProfileSnippet({ title, body }) {
    return (
        <div className="profile-snippet">
            <div className={`title-container`}>
                <div className="vertical-line"></div>
                <h2>{title}</h2>
            </div>
            <div className="profile-section-text">
                {body}
            </div>
        </div>
    );
}

export default ProfileSnippet;
