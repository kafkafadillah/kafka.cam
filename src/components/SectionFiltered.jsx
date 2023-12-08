import React, { Children } from "react";

export default function SectionFiltered({ activeProfile, categoryFilter, handleClickImg, handleClickedProfile, handleCollectedImg }) {
  console.log(activeProfile);
  return (
    <div className={activeProfile != null ? "hide_component" : "infinite-scroll-component "}>
      {categoryFilter.map((item) => (
        <div className="sec-content-item" key={item.id}>
          <img onClick={() => handleClickImg(item.id)} src={item.urls.regular} alt={item.alt_description} />
          <div className="content-item-footer">
            <div className="content-footer-profile">
              <div className="footer-profile-img" onClick={() => handleClickedProfile(item)}>
                <img src={item.user.profile_image.small} alt="Profile" />
              </div>
              <p>{item.alt_description && item.alt_description.length > 8 ? item.alt_description.substring(0, 20) + "..." : item.alt_description}</p>
            </div>
            <div className="content-footer-btn">
              <button onClick={() => handleCollectedImg(item)}>⤓</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
