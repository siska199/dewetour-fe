import React from "react";
import styled from "styled-components";
import palm from "../assets/palm.png";
import hibiscus from "../assets/hibiscus.png";

const Palm = styled.img`
  position: absolute;
  top: ${(props) => props.tp};
  left: ${(props) => props.lp};
`;
const Hibiscus = styled.img`
  position: absolute;
  top: ${(props) => props.th};
  left: ${(props) => props.lh};
`;
/*
tp : top-palm
lp : left-palm
th : top-hibiscus
lh : left-hibiscus  
*/
export default function BackgroundImageLanding({ tp, lp, th, lh }) {
  return (
    <div>
      <Palm src={palm} tp={tp} lp={lp} />
      <Hibiscus src={hibiscus} th={th} lh={lh} />
    </div>
  );
}
