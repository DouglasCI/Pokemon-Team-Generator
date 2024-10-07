import React from "react";
import { ButtonSmall } from "./Buttons";
import PokemonItem from "./PokemonItem";

function PokemonContainer(props) {
  return (
    <div className="row d-flex align-items-center justify-content-center border border-dark-subtle rounded-5 bg-absurdity">
      <p className="row lead justify-content-center mt-1 opacity-75 text-white">
        Click on any Pokémon to check it's official Pokédex!
      </p>
      <div className="row">
        {props.pokemons.map((pokemon) => {
          return (
            <div className="col-lg-6 col-xxl-4 d-flex align-items-stretch justify-content-center">
              <PokemonItem
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                spriteURL={pokemon.spriteURL}
              />
            </div>
          );
        })}
      </div>
      <div className="row d-flex align-items-center justify-content-center border-top">
        <ButtonSmall action={props.action} text={"Generate another team!"} />
      </div>
    </div>
  );
}

export default PokemonContainer;
