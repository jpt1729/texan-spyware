"use client";
import React, { useState, useEffect, useRef } from "react";

import TexasFlag from "./texasflag.jpg";
import TexasAnthem from "./texas-anthem.mp3";

import "./styles.css";

export default function TexanSpyware() {
  const [typedText, setTypedText] = useState("");
  const [containsTexas, setContainsTexas] = useState(false);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const songRef = useRef(new Audio(TexasAnthem));
  songRef.current.currentTime = 7;

  useEffect(() => {
    const handleKeyDown = (event) => {
      const newTypedText = typedText + event.key;

      setTypedText(newTypedText);
      if (
        newTypedText.toLowerCase().includes("texas") ||
        newTypedText.toLowerCase().includes("texan")
      ) {
        songRef.current.play();
        setContainsTexas(true);

        console.log(`
        ____
             !
       !     !
       !      \`-  _ _    _ 
       |              \`\`\`  !
  _____!                   !
  \\,                        \\
    l    _                  ;
     \\ _/  \\.              /
             \\           .’ 
              .       ./
               \`.    ,
                 \\   ;
                   \`\`\’`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText]);

  if (!containsTexas) return;
  return (
    <div id="texas-container">
      <button
        onClick={(e) => {
          setNumberOfClicks(numberOfClicks + 1);
          if (numberOfClicks > 3) {
            setContainsTexas(false);
            setTypedText("");
            songRef.current.pause();
            songRef.current.currentTime = 7;
            setNumberOfClicks(0);
          }
          const x = Math.floor(Math.random() * window.innerWidth);
          const y = Math.floor(Math.random() * window.innerHeight);
          e.currentTarget.style.left = x + "px";
          e.currentTarget.style.top = y + "px";
        }}
        id="close-texas"
      >
        Close
      </button>
      <img src={TexasFlag} alt="TexasFlag from texan spyware" id="texas-flag" />
    </div>
  );
}
