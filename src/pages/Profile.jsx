import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Overlay from "../components/overlay";
import defaultProfileImage from "../../public/img/profil/kafka.png";
import ProfileRenderOther from "./ProfileRenderOther";
import ProfileRenderUser from "./ProfileRenderUser";

export default function Profile({
  fotoDiProfile,
  imgDisukai,
  profileUserActive,
  closeProfile,
  clickedImg,
  handleClickedLike,
  collcetButtonColor,
  likeButtonColor,
  clickedImgId,
  handleClickedProfile,
  handleCollectedImg,
  imgUpdatedLike,
  objectProfile,
}) {
  const [overlayImg, setOverlayImg] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [photoDiProfile, setPhotoDiProfile] = useState(fotoDiProfile);

  console.log("rendered from Comp profile", fotoDiProfile);
  console.log("rendered from Comp", objectProfile);
  // console.log("SHOW", showOverlay);
  console.log("OVERLAYIMG", overlayImg);

  useEffect(() => {
    console.log("IMG DISUKAI", imgDisukai);
  }, [imgDisukai]);

  useEffect(() => {
    setPhotoDiProfile(fotoDiProfile);
  }, [fotoDiProfile]);

  const profileImage = objectProfile.user.profile_image.large || defaultProfileImage;
  const username = objectProfile.user.username;
  const name = objectProfile.user.name;
  const total_photos = objectProfile.user.total_photos;
  const total_likes = objectProfile.user.total_likes;

  // console.log("USERNAME", username);
  // console.log("NAME", name);
  // console.log("TOTAL_LIKES", total_likes);
  // console.log("TOTAL_PHOTOS", total_photos);
  console.log("FOTO PROFIL", profileImage);

  const handleClickImg = (id) => {
    const clickedImgForOverlay = fotoDiProfile.find((img) => img.id === id);
    setOverlayImg(clickedImgForOverlay);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleCloseProfile = () => {
    closeProfile(null);
    setPhotoDiProfile[fotoDiProfile];
  };

  return (
    <>
      <div className="container-profile">
        <div className="profile">
          <div className="btn-close-profile">
            <button onClick={() => handleCloseProfile()}>⇐</button>
          </div>
          <div className="profile-header">
            <div className="profile-header-img">
              <img src={profileImage} alt="PROFILE" />
            </div>
            <div className="profile-username">
              <h1>{username}</h1>
              <p>{name}</p>
            </div>
            <div className="profile-info">
              <div className="profile-info-post">
                <strong>Posts</strong>
                <br />
                {total_photos}
              </div>
              <div className="profile-info-likes">
                <strong>Likes</strong>
                <br />
                {total_likes}
              </div>
            </div>
          </div>
          <div className="profile-body">
            <div className="sec-content">
              <div className="infinite">
                <ProfileRenderOther photoDiProfile={photoDiProfile} handleClickImg={handleClickImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOverlay && (
        <Overlay
          closeOverlay={handleCloseOverlay}
          clickedImg={overlayImg}
          clickedLike={handleClickedLike}
          imgUpdatedLike={imgUpdatedLike}
          collectColor={collcetButtonColor}
          likeColor={likeButtonColor}
          collectedImg={handleCollectedImg}
          clickButtonId={clickedImgId}
          clickedProfile={handleClickedProfile}
        />
      )}
    </>
  );
}
