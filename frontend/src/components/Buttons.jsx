import React from "react";

export function ButtonBig(props) {
  return (
    <button
      className="button button-lg noto-sans-jp-bold m-5"
      onClick={props.action}
    >
      {props.text}
    </button>
  );
}

export function ButtonSmall(props) {
  return (
    <button
      className="button button-sm noto-sans-jp-bold m-4"
      onClick={props.action}
    >
      {props.text}
    </button>
  );
}

export default ButtonBig;
