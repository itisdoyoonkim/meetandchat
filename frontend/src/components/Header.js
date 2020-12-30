import React from "react";

function Header() {
  return (
    <>
      <h2 style={textStyle}>VANTALK</h2>
      <h3 style={textStyle}>
        kakaotalk<strong>openchat</strong>: 벤쿠버/밴쿠버
      </h3>
    </>
  );
}

const textStyle = {
  color: "#fefefa",
};

export default Header;
