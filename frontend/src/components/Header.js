import React from "react";

function Header() {
  return (
    <>
      <h1>
        <a
          style={headingOneStyle}
          href="https://www.vantalk.ca"
          content="brand-name"
        >
          VANTALK
        </a>
      </h1>
      <h2 style={headingTwoStyle}>
        kakaotalk<strong>openchat</strong>: 벤쿠버/밴쿠버
      </h2>
    </>
  );
}

const headingOneStyle = {
  color: "#fefefa",
};

const headingTwoStyle = {
  color: "#fefefa",
  fontSize: "1rem",
};

export default Header;
