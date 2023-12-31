import * as React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import SelectPokemon from "./components/SelectPokemon";
import Fight from "./components/Fight";
import LandingPage from "./components/LandingPage";
import SelectPokemon3v3 from "./components/SelectPokemon3v3";
import Fight3v3 from "./components/Fight3v3";
import Loading from "./components/Loading";
import backgroundMusic from "./music/pokemon_music.mp3";
import bg from "./images/body_bg.png";
import bg_white from "./images/container_bg.png";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [bgColor, setBgColor] = React.useState(false);

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [pokemons, setPokemons] = React.useState([]);

  const [loaded, setLoaded] = React.useState(false);

  const [selectedPoke, setSelectedPoke] = React.useState();

  const [selectedPokeSecond, setSelectedPokeSecond] = React.useState();

  const [selectedPokemons3v3, setSelectedPokemons3v3] = React.useState();

  const fetchPokemons = async () => {
    const response = await axios.get("http://localhost:5000/api");
    console.log(response.data);
    setLoaded(true);
    setPokemons(response.data);
  };

  React.useEffect(() => {
    fetchPokemons();
    setBgColor(false);
  }, []);

  React.useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0.2;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const firstPokeSelect = (event, value) => {
    setSelectedPoke(value);
  };

  const secondPokeSelect = (event, value) => {
    setSelectedPokeSecond(value);
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        backgroundImage: `url(${bgColor ? bg_white : bg})`,
        // backgroundRepeat: "repeat",
        // backgroundSize: "contain",
      }}
    >
      <Navbar isPlaying={isPlaying} togglePlay={togglePlay}></Navbar>
      {!loaded ? (
        <Loading></Loading>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage loaded={loaded} />} />
          <Route
            path="/selection1v1"
            element={
              <SelectPokemon
                setBgColor={setBgColor}
                pokemons={pokemons}
                firstPokeSelect={firstPokeSelect}
                secondPokeSelect={secondPokeSelect}
                selectedPoke={selectedPoke}
                selectedPokeSecond={selectedPokeSecond}
              />
            }
          />
          <Route
            path="/selection3v3"
            element={
              <SelectPokemon3v3
                setBgColor={setBgColor}
                selectedPokemons3v3={selectedPokemons3v3}
                setSelectedPokemons3v3={setSelectedPokemons3v3}
                pokemons={pokemons}
              />
            }
          />

          <Route
            path="/fight"
            element={<Fight setBgColor={setBgColor} pokemons={pokemons} />}
          />
          <Route
            path="/fight3v3"
            element={
              <Fight3v3
                setBgColor={setBgColor}
                pokemons={pokemons}
                selectedPokemons3v3={selectedPokemons3v3}
              />
            }
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard pokemons={pokemons}></Leaderboard>}
          />
        </Routes>
      )}
    </div>
  );
}
