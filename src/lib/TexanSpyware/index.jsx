"use client";
import React, { useState, useEffect, useRef } from "react";

import TexasFlag from "./texasflag.jpg";
import Bucee from "./bucee.jpg";
import HEB from "./HEB.svg";
import TexasAnthem from "./texas-anthem.mp3";
import BooSound from "./boo.mp3";

import Boo from "./hate.png";

import Boo2 from "./Hate2.jpg";

import "./styles.css";
const inTexas = async () => {
  const res = await fetch("http://ip-api.com/json/");
  const body = await res.json();
  return body.region === "TX";
};

export default function TexanSpyware() {
  const [typedText, setTypedText] = useState("");
  const [containsTexas, setContainsTexas] = useState(false);
  const [containsHate, setHate] = useState(false);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [images, setImages] = useState([
    { id: 1, type: "bucee" },
    { id: 2, type: "heb" },
  ]);
  const songRef = useRef(new Audio(TexasAnthem));
  const booRef = useRef(new Audio(BooSound));
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

        inTexas();
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
      } else if (
        newTypedText.toLowerCase().includes("california") ||
        newTypedText.toLowerCase().includes("georgia")
      ) {
        booRef.current.play();
        setHate(true);
      }
      navigator.geolocation.getCurrentPosition(
        () => {},
        () => {}
      );
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText]);

  useEffect(() => {
    if (containsTexas) {
      images.forEach((img) => {
        const imgElement = document.getElementById(`img-${img.id}`);
        let starting_coords = {
          x: window.innerWidth * 0.75 * Math.random() + window.innerWidth * 0.1,
          y:
            window.innerHeight * 0.75 * Math.random() +
            window.innerHeight * 0.1,
        };
        imgElement.style.left = starting_coords.x + "px";
        imgElement.style.top = starting_coords.y + "px";
        let xDirection = Math.random() < 0.5 ? 1 : -1;
        let yDirection = Math.random() < 0.5 ? 1 : -1;
        const position = {
          x: 0,
          y: 0,
        };
        const moveImage = () => {
          const rect = imgElement.getBoundingClientRect();
          if (
            starting_coords.y + position.y <= 0 ||
            starting_coords.y + position.y + rect.height >= window.innerHeight
          ) {
            yDirection *= -1;
          }
          if (
            starting_coords.x + position.x <= 0 ||
            starting_coords.x + position.x + rect.width >=
              window.innerWidth - 50
          ) {
            xDirection *= -1;
          }
          position.x += 5 * xDirection;
          position.y += 5 * yDirection;
          imgElement.style.transform = `translate(${position.x + "px"}, ${
            position.y + "px"
          })`;
          //imgElement.style.top = rect.top + yDirection * 5 + "px";
        };

        const interval = setInterval(moveImage, 20);
        imgElement.setAttribute("data-interval", interval);
      });

      return () => {
        images.forEach((img) => {
          try {
            const imgElement = document.getElementById(`img-${img.id}`);
            clearInterval(imgElement.getAttribute("data-interval"));
          } catch (error) {}
        });
      };
    }
  }, [containsTexas, images]);

  if (!containsTexas && !containsHate) return null;
  if (containsHate)
    return (
      <img
        id="hate"
        src={Math.random() > 0.5 ? Boo : Boo2}
        alt="Thumbs Down"
        style={{ position: "fixed", top: 0, left: 0 }}
      />
    );
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
            setImages([
              { id: 1, type: "bucee" },
              { id: 2, type: "heb" },
            ]);
          } else {
            setImages((prevImages) => [
              ...prevImages,
              ...prevImages.map((img) => ({
                id: prevImages.length + img.id,
                type: img.type,
              })),
            ]);
            const x = Math.floor(
              window.innerHeight * 0.75 * Math.random() +
                window.innerHeight * 0.1
            );
            const y = Math.floor(
              window.innerHeight * 0.75 * Math.random() +
                window.innerHeight * 0.1
            );
            e.currentTarget.style.left = x + "px";
            e.currentTarget.style.top = y + "px";
          }
        }}
        id="close-texas"
      >
        Close
      </button>
      <img src={TexasFlag} alt="TexasFlag from texan spyware" id="texas-flag" />
      {images.map((img) => (
        <img
          key={img.id}
          id={`img-${img.id}`}
          src={img.type === "bucee" ? Bucee : HEB}
          alt={img.type}
          className="moving"
        />
      ))}
    </div>
  );
}
