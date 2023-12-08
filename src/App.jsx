import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import Section from "./components/section";
import axios from "axios";
import Profile from "./pages/Profile";
import Loader from "./components/Loading";

function App() {
  const [search, setSearch] = useState("");
  const [foto, setFoto] = useState([]);
  const [originalPhotos, setOriginalPhotos] = useState([]);
  const [usernameProfileActive, setUsernameProfileActive] = useState(null);
  const [profileActive, setProfileActive] = useState(false);
  const [page, setPage] = useState(1);
  const [isScrollPage, setIsScrollPage] = useState(false);
  const [fotoScroll, setFotoScroll] = useState([]);
  const [orientationPage, setOrientationPage] = useState("home");
  const [filterFoto, setFilterFoto] = useState([]);
  const [filterFotoScroll, setFilterFotoScroll] = useState([]);
  const [searchActive, setSearhActive] = useState(false);
  const [orientationBtn, setOrientationBtn] = useState(null);
  const [fotoDiProfile, setFotoDiProfile] = useState([]);
  const [objectProfile, setObjecteProfile] = useState(null);

  const handleSearch = (searchValue) => {
    if (searchValue === null) {
      setFoto(originalPhotos);
      setSearch("");
      setSearhActive(false);
    } else {
      setSearhActive(true);
      setSearch(searchValue);
      fetchImages();
    }
  };

  const handleActiveProfile = (clickedImg) => {
    setUsernameProfileActive(clickedImg.user.username);
    setObjecteProfile(clickedImg);
    setProfileActive(true);
  };

  const handleCloseProfile = () => {
    setProfileActive(false);
  };

  const handleChangeOrientation = (orien) => {
    setOrientationBtn(orien);
  };

  useEffect(() => {
    console.log("OBJECT PROFILE :", objectProfile);
  }, [objectProfile]);

  useEffect(() => {
    fetchImages();
  }, [usernameProfileActive]);

  useEffect(() => {
    console.log("ini search value", search);
  }, [search]);

  // GET /users/:username
  // GET /users/:username/collections
  // GET /photos/random
  // GfRs2UtEgadAS1J3g7Mvt5OWm58wYDIPazWtt8QB9zU
  // xCfys0Juz-mBnA9LzZyQY8fvtpOi8-Cxead3BSOleqw

  const fetchImages = () => {
    const APIKEY = "GfRs2UtEgadAS1J3g7Mvt5OWm58wYDIPazWtt8QB9zU";
    const randomUrl = `photos/random?client_id=${APIKEY}&count=5`;
    const profilUrl = `users/${usernameProfileActive}/photos?client_id=${APIKEY}`;
    const orientationUrl = `photos/random?orientation=${orientationBtn}&client_id=${APIKEY}&count=2`;
    const searchUrl = `search/photos?page=1&query=${search}&client_id=${APIKEY}`;
    if (searchActive === true) {
      axios.get(`https://api.unsplash.com/${searchUrl}`).then((response) => {
        console.log(response.data.results);
        setFoto(response.data.results);
      });
    } else if (orientationBtn != null) {
      axios.get(`https://api.unsplash.com/${orientationUrl}`).then((response) => {
        console.log("collections ", response.data);
        setFoto(response.data);
        console.log("ORIENTATION", orientationBtn);
      });
    } else if (profileActive === true) {
      axios.get(`https://api.unsplash.com/${profilUrl}`).then((response) => {
        setFoto(response.data);
        setFotoDiProfile(response.data);
        console.log("PROFIL ACTIVE: ", response.data);
      });
    } else {
      axios.get(`https://api.unsplash.com/${randomUrl}`).then((response) => {
        console.log(response.data);
        console.log("RANDOM", orientationBtn);
        setFoto([...foto, ...response.data]);
      });
    }
  };

  useEffect(() => {
    console.log("App Profile Active ", profileActive);
  }, [profileActive]);

  return (
    <>
      {!profileActive && (
        <>
          <Header className={!profileActive ? "hide-component" : ""} />
          <Hero className={!profileActive ? "hide-component" : ""} onSearch={handleSearch} />
        </>
      )}
      <Section
        search={search}
        foto={foto}
        fetchImages={fetchImages}
        orientationPage={orientationPage}
        updateFoto={setFoto}
        isScrollPage={isScrollPage}
        fotoScroll={fotoScroll}
        originalPhotos={originalPhotos}
        profileActive={handleActiveProfile}
        searchActive={searchActive}
        orientation={handleChangeOrientation}
        fotoDiProfile={fotoDiProfile}
        objectProfile={objectProfile}
        closeProfile={handleCloseProfile}
      />
    </>
  );
}

export default App;
