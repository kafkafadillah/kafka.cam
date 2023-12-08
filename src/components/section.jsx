import React, { Profiler, useEffect, useState } from "react";
import Overlay from "./overlay";
import Loader from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import SectionHeader from "./SectionHeader";
import { Children } from "react";
import SectionHome from "./SectionHome";
import SectionFiltered from "./SectionFiltered";
import { Navigate, useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";

const dataCategory = [
  { id: 1, category: "All" },
  {
    id: 2,
    category: "Landscape",
  },
  {
    id: 3,
    category: "Potrait",
  },
  {
    id: 4,
    category: "Square",
  },
];

export default function Section({ onClickedImg, search, closeProfile, searchActive, objectProfile, fotoDiProfile, foto, fetchImages, orientation, isScrollPage, fotoScroll, updateFoto, originalPhotos, profileActive }) {
  const [dropdown, setDropdown] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [clickedImg, setClickedImg] = useState([]);
  const [showOverlayy, setShowOverlayy] = useState(false);
  const [collectedImg, setCollectedImg] = useState([]);
  const [imgUpdatedLike, setImgUpdatedLike] = useState([]);
  const [imgDisukai, setImgDisukai] = useState([]);
  const [btnLikeClicked, setBtnLikeClicked] = useState(false);
  const [collcetButtonColor, setCollectButtonColor] = useState("black");
  const [likeButtonColor, setLikeButtonColor] = useState("black");
  const [clickedImgId, setClickedImgId] = useState(null);
  const [landscapeImg, setLandscapeImg] = useState([]);
  const [potraitImg, setPotraitImg] = useState([]);
  const [squareImg, setSquareImg] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const [changeToAll, setChangeToAll] = useState(false);

  const renderChildren = () => {
    if (dropdown === "liked") {
      return <SectionFiltered categoryFilter={imgDisukai} handleClickImg={handleClickImg} handleClickedProfile={handleClickedProfile} handleCollectedImg={handleCollectedImg} />;
    } else if (dropdown === "collected") {
      return <SectionFiltered categoryFilter={collectedImg} handleClickImg={handleClickImg} handleClickedProfile={handleClickedProfile} handleCollectedImg={handleCollectedImg} />;
    } else {
      return <SectionHome categoryFilter={categoryFilter} handleClickImg={handleClickImg} fetchImages={fetchImages} handleClickedProfile={handleClickedProfile} handleCollectedImg={handleCollectedImg} />;
    }
  };

  const handleChangeDropdownOption = (event) => {
    const dropDownValue = event.target.value;
    setDropdown(dropDownValue);

    switch (dropDownValue) {
      case "collected":
        setCategoryFilter(collectedImg);

        break;
      case "liked":
        setCategoryFilter(imgDisukai);

        break;
      default:
        setCategoryFilter(originalPhotos);

        break;
    }
  };

  const handleClickCategory = (category) => {
    if (category === "All") {
      setCategoryFilter(originalPhotos);
      orientation(null);
    } else if (category === "Landscape") {
      const filteredCat = categoryFilter.filter((img) => img.width > img.height);
      setLandscapeImg(filteredCat);
      setCategoryFilter(landscapeImg);
      orientation("landscape");
    } else if (category === "Potrait") {
      const filteredCat = categoryFilter.filter((img) => img.width < img.height);
      setPotraitImg(filteredCat);
      setCategoryFilter(potraitImg);
      orientation("portrait");
    } else if (category === "Square") {
      const filteredCat = categoryFilter.filter((img) => img.width === img.height);
      setSquareImg(filteredCat);
      setCategoryFilter(squareImg);
      orientation("squarish");
    }
  };

  const handleClickImg = (id) => {
    const clickedImgForOverlay = categoryFilter.find((item) => item.id === id);
    setShowOverlayy(true);
    setClickedImg(clickedImgForOverlay);
    setClickedImgId(id);
    console.log("clickedIMG", clickedImg);
    const isLiked = imgDisukai.some((img) => img.id === id);
    setLikeButtonColor(isLiked ? "red" : "black");
    const isCollected = collectedImg.some((img) => img.id === id);
    setCollectButtonColor(isCollected ? "red" : "black");
  };

  const handleClickedProfile = (clickedImg) => {
    const userNameProfile = clickedImg.user.username;
    profileActive(clickedImg);
    setActiveProfile(userNameProfile);
  };

  const handleCloseOverlay = (clickedImg) => {
    setClickedImg(null);
    setShowOverlayy(false);
  };

  useEffect(() => {
    setCategoryFilter(originalPhotos);
  }, [changeToAll]);

  useEffect(() => {
    setCategoryFilter(foto);
  }, [foto]);

  const handleCollectedImg = (clickedImg) => {
    const everClicked = collectedImg.some((img) => img.id === clickedImg.id);
    if (!everClicked) {
      const newCollectedImg = [...collectedImg, clickedImg];
      setCollectedImg(newCollectedImg);
      setCollectButtonColor("white");
    } else {
      const newCollectedImg = collectedImg.filter((img) => img.id != clickedImg.id);
      setCollectedImg(newCollectedImg);
      setCollectButtonColor("black");
    }
  };

  const handleRemoveCollectedImg = (clickedImg) => {
    const updatedCollectedImg = collectedImg.filter((img) => img.id !== clickedImg.id);
    setCollectedImg(updatedCollectedImg);
    console.log("handleRemoveImg");
  };

  const handleClickedLike = (clickedImg) => {
    const everClicked = imgDisukai.some((img) => img.id === clickedImg.id);
    const imgCatFilterselainImgTerkini = categoryFilter.filter((img) => img.id !== clickedImg.id);

    if (!everClicked) {
      console.log("like diklik 1");
      const updatedLike = clickedImg.likes + 1;
      const isObjectExist = imgUpdatedLike.some((img) => img.id === clickedImg.id);

      if (!isObjectExist) {
        setClickedImg({ ...clickedImg, likes: updatedLike });
        setBtnLikeClicked(!btnLikeClicked);
      } else {
        const updatedLikesArray = imgUpdatedLike.map((img) => (img.id === clickedImg.id ? { ...img, likes: img.likes + 1 } : img));
        setImgUpdatedLike(updatedLikesArray);
        setBtnLikeClicked(!btnLikeClicked);
        setClickedImg(updatedLikesArray);
      }

      const updatedCategoryFilter = categoryFilter.map((img) => (img.id === clickedImg.id ? { ...img, likes: updatedLike } : img));
      setCategoryFilter(updatedCategoryFilter);
      updateFoto(updatedCategoryFilter);

      setImgDisukai([...imgDisukai, { ...clickedImg, likes: updatedLike }]);
      setLikeButtonColor("white");
    } else {
      console.log("like diklik 2");

      const updatedDisukai = imgDisukai.filter((img) => img.id !== clickedImg.id);
      setImgDisukai(updatedDisukai);
      const updatedClickedImg = { ...clickedImg, likes: clickedImg.likes - 1 };
      setClickedImg(updatedClickedImg);
      setBtnLikeClicked(!btnLikeClicked);

      const imgTerkiniDisukai = imgDisukai.find((img) => img.id === clickedImg.id);

      const updatedCategoryFilter = categoryFilter.map((img) => (img.id === clickedImg.id ? { ...img, likes: imgTerkiniDisukai.likes - 1 } : img));
      setCategoryFilter(updatedCategoryFilter);
      updateFoto(updatedCategoryFilter);
      setLikeButtonColor("black");
    }
  };

  useEffect(() => {
    console.log("Category Filter: ", categoryFilter);
  }, [categoryFilter]);

  useEffect(() => {
    console.log("Collected Img: ", collectedImg);
  }, [collectedImg]);

  useEffect(() => {
    console.log("Liked Img: ", imgDisukai);
  }, [imgDisukai]);

  useEffect(() => {
    console.log("Overlay: ", showOverlayy);
  }, [showOverlayy]);

  const handleCloseProfile = (param) => {
    setActiveProfile(param);
    closeProfile(true);
    setChangeToAll(true);
  };

  return (
    <>
      <div className="section">
        {activeProfile != null ? (
          <Profile
            activeProfile={activeProfile}
            closeProfile={handleCloseProfile}
            fotoDiProfile={fotoDiProfile}
            // showOverlay={showOverlay}
            handleCloseOverlay={handleCloseOverlay}
            collcetButtonColor={collcetButtonColor}
            likeButtonColor={likeButtonColor}
            clickedImgId={clickedImgId}
            clickedImg={clickedImg}
            handleClickImg={handleClickImg}
            handleClickedLike={handleClickedLike}
            handleClickedProfile={handleClickedProfile}
            handleCollectedImg={handleCollectedImg}
            imgUpdatedLike={imgUpdatedLike}
            objectProfile={objectProfile}
            imgDisukai={imgDisukai}
          />
        ) : (
          ""
        )}
        {activeProfile == null && <SectionHeader dropdown={dropdown} handleChangeDropdownOption={handleChangeDropdownOption} handleClickCategory={handleClickCategory} dataCategory={dataCategory} />}

        <div className={activeProfile == null ? "sec-content" : "hide-component"}>
          {dropdown === "all" ? (
            <SectionHome categoryFilter={categoryFilter} handleClickImg={handleClickImg} fetchImages={fetchImages} handleClickedProfile={handleClickedProfile} handleCollectedImg={handleCollectedImg} />
          ) : (
            renderChildren()
          )}
        </div>
      </div>

      {activeProfile === null && showOverlayy === true ? (
        <Overlay
          key={clickedImg.id}
          closeOverlay={handleCloseOverlay}
          clickedImg={clickedImg}
          clickedLike={handleClickedLike}
          imgUpdatedLike={imgUpdatedLike}
          collectColor={collcetButtonColor}
          likeColor={likeButtonColor}
          collectedImg={handleCollectedImg}
          // collectClicked={btnCollectClicked}
          clickButtonId={clickedImgId}
          clickedProfile={handleClickedProfile}
        />
      ) : (
        ""
      )}
    </>
  );
}
