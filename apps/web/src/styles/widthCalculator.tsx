/* Library imports */
import React, { useEffect, useState } from "react";

export default function Calc(value: any) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    return () => {
      setWindowWidth(0);
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, []);

  if (windowWidth < 768.1) {
    return value * (windowWidth / 390);
  } else {
    return value * (windowWidth / 1440);
  }
}

export const Width = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [width, setWidth] = useState(windowWidth < 576.1 ? "small" : "large");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    return () => {
      setWindowWidth(0);
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, []);

  return width;
};
