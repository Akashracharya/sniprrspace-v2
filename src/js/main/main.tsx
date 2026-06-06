import { useEffect, useState } from "react";
import {
  subscribeBackgroundColor,
  evalTS,
} from "../lib/utils/bolt";

import "./main.scss";

export const App = () => {
  const [bgColor, setBgColor] = useState("#282c34");

  useEffect(() => {
    if (window.cep) {
      subscribeBackgroundColor(setBgColor);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | TEST CONNECTION
  |--------------------------------------------------------------------------
  */

  const testAE = async () => {
    try {
      await evalTS("helloWorld");
    } catch (err) {
      console.error(err);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | MOVE PLAYHEAD
  |--------------------------------------------------------------------------
  */

  const moveForward = async () => {
    try {
      await evalTS("moveCTI", 1);
    } catch (err) {
      console.error(err);
    }
  };

  const moveBackward = async () => {
    try {
      await evalTS("moveCTI", -1);
    } catch (err) {
      console.error(err);
    }
  };


  const deleteLayers = async () => {
    await evalTS("deleteSelectedLayers");
  };

  const trimLeft = async () => {
    await evalTS("trimSelectedLayers", "left");
  };

  const trimRight = async () => {
    await evalTS("trimSelectedLayers", "right");
  };

  const moveInPoint = async () => {
    await evalTS("moveLayerPoint", "in");
  };

  const moveOutPoint = async () => {
    await evalTS("moveLayerPoint", "out");
  };

  return (
    <div
      className="app"
      style={{
        backgroundColor: bgColor,
        height: "100vh",
        padding: "20px",
      }}
    >
      <header className="app-header">
        <h2>SNIPRRSPACE v2</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={testAE}>
            Test AE
          </button>

          <button onClick={moveBackward}>
            -1 Frame
          </button>

          <button onClick={moveForward}>
            +1 Frame
          </button>

          <button onClick={trimLeft}>
            Trim Left
          </button>

          <button onClick={trimRight}>
            Trim Right
          </button>

          <button onClick={moveInPoint}>
            Move In
          </button>

          <button onClick={moveOutPoint}>
            Move Out
          </button>

          <button onClick={deleteLayers}>
            Delete
          </button>
        </div>
      </header>
    </div>
  );
};