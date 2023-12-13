import React from "react";

export default function Header({ handleClickProfile }) {
  const clickedImg = {
    user: {
      username: "kafka",
      name: "khafka fadillah",
      total_potos: 0,
      total_likes: 0,
      profile_image: {
        large: "./profil/kafka.png",
      },
    },
  };
  return (
    <div className="header">
      <div className="logo">
        <img src="/Group 7 1.png" alt="" />
        KAFKA.CAM
      </div>
      <div className="extra">
        <div className="header-login-btn" onClick={() => handleClickProfile(clickedImg)}></div>
      </div>
    </div>
  );
}
