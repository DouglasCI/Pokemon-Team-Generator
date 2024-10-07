import React from "react";

function PokemonItem(props) {
  return (
    <a
      className="card bg-secondary bg-gradient rounded-4 m-4 overflow-hidden border"
      style={{ width: 9 + "rem" }}
      href={"https://www.pokemon.com/us/pokedex/" + props.id}
      target={"_blank"}
      rel={"noopener noreferrer"}
    >
      <img className="card-img-top" src={props.spriteURL}></img>
      <div className="card-body bg-dark bg-gradient text-white text-center">
        <p className="card-title noto-sans-jp-regular fs-sm">{props.name}</p>
      </div>
    </a>
  );
}

export default PokemonItem;
