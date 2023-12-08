import React, { useState } from "react";

export default function Overlay({ closeOverlay, clickedImg, clickedLike, collectedImg, clickedProfile, btnLikeClicked, likeColor, collectClicked, collectColor, downloadImage }) {
  console.log("ini Image YBS:", clickedImg);
  // console.log("like :", clickedImg.likes);

  return (
    <div className="overlay">
      <div className="overlay-close-btn">
        <button onClick={closeOverlay}>X</button>
      </div>
      <div className="overlay-container">
        <div className="overlay-content">
          {/* Header Content Start */}
          <div className="overlay-content-header">
            <div className="overlay-content-profile" onClick={() => clickedProfile(clickedImg)}>
              <div className="overlay-profile-img">
                <img src={clickedImg.user.profile_image.small} alt="Profile" />
              </div>
              <p>{clickedImg.user.username}</p>
            </div>
            <div className="overlay-content-name">
              <h3>{clickedImg.alt_description}</h3>
            </div>
            <div className="overlay-content-btn">
              <div className="overlay-collect-btn">
                <button id="collect-btn" onClick={() => collectedImg(clickedImg)} style={{ color: collectColor === "black" ? "black" : "white", backgroundColor: collectColor === "black" ? "white" : "red" }}>
                  Collect
                </button>
              </div>
              <div className="overlay-like-btn">
                <button id="like-btn" onClick={() => clickedLike(clickedImg)} style={{ color: likeColor === "black" ? "black" : "white", backgroundColor: likeColor === "black" ? "white" : "red" }}>
                  ♡ {clickedImg.likes}
                </button>
              </div>
            </div>
          </div>
          {/* Header Content End */}

          {/* Body Content Start */}
          <div className="overlay-content-body">
            <img src={clickedImg.urls.regular} alt="" />
          </div>
          {/* Body Content End */}
        </div>
      </div>
    </div>
  );
}
