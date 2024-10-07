import React from "react";

function Footer() {
  return (
    <footer className="d-flex border-top border-dark pt-2">
      <p className="col text-start lead fs-6 text-body-secondary">
        Made with React, Bootstrap and Node
      </p>
      <p className="col text-end lead fs-6 text-body-secondary">
        Data fetched from <a href="https://pokeapi.co/">PokéAPI</a>
      </p>
    </footer>
  );
}

export default Footer;
