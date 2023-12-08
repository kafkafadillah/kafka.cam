import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loading";
import "../App.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function ({ categoryFilter, handleClickImg, fetchImages, handleClickedProfile, handleCollectedImg }) {
  console.log("SECTION HOME");
  return (
    <InfiniteScroll dataLength={categoryFilter.length} next={fetchImages} hasMore={true} loader={<Loader />}>
      {categoryFilter.map((item) => (
        <div className="sec-content-item" key={item.id}>
          <img onClick={() => handleClickImg(item.id)} src={item.urls.regular} alt={item.alt_description} />
          <div className="content-item-footer">
            <div className="content-footer-profile" onClick={() => handleClickedProfile(item)}>
              <div className="footer-profile-img">
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
    </InfiniteScroll>
  );
}
