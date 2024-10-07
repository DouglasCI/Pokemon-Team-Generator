import React, { useState } from "react";
import PokemonContainer from "./PokemonContainer";
import { ButtonBig } from "./Buttons";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/main.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function fetchData() {
    const response = await fetch("/api", {
      method: "GET",
    });
    const result = await response.json();
    setPokemons(result.data);
  }

  return (
    <div className="container min-vh-100 w-50 d-flex flex-column justify-content-between bg-diamonds">
      <Header />
      <div className="row justify-content-center align-items-center">
        <div className="row justify-content-center align-items-center">
          {pokemons.length === 0 ? (
            <ButtonBig action={fetchData} text={"Click to generate a team!"} />
          ) : (
            <PokemonContainer action={fetchData} pokemons={pokemons} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
