/* eslint-disable */
import React, { useEffect, useState } from "react";
import Page, { pagina } from "../organisms/Page";

const queryParams = new URLSearchParams(window.location.search);
const plantilla = queryParams.get("plantilla");

const DynamicStyle = () => {
  switch (plantilla) {
    case "violencia-sexual":
      import("./Styles/violencia-sexual.css");
      break;
    default:
      import("./Styles/default.css");
  }

  return (
    <>
      <code>Plantilla: {plantilla}</code>
    </>
  );
};

export default DynamicStyle;
