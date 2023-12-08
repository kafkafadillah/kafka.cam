import React from "react";

export default function ProfileRenderOther({ photoDiProfile, handleClickImg }) {
  return (
    <>
      {photoDiProfile.map((img) => (
        <div className="sec-content-item" key={img.id} onClick={() => handleClickImg(img.id)}>
          <img src={img.urls.small} alt={img.alt_description} />
          <div className="content-item-footer">
            <div className="content-footer-profile">
              <div className="footer-profile-img">
                <img src={img.user.profile_image.small} alt="Profile" />
              </div>
              <p>{img.alt_description && img.alt_description.length > 8 ? img.alt_description.substring(0, 20) + "..." : img.alt_description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
