/* eslint-disable */

import blogTitle from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  let [showImage, setShowImage] = useState(false);
  let [fullScreen, setFullScreen] = useState(false);
  let [fullScreenRed, setFullScreenRed] = useState(false);

  const handleClick = () => {
    setFullScreen(true);
    setTimeout(() => {
      setFullScreen(false);
    }, 3000);
  };

  const handleRedClick = () => {
    const audio = new Audio(require('./sound.mp3'));
    audio.play();

    setFullScreenRed(true);
    setTimeout(() => {
      setFullScreenRed(false);
    }, 3000);
  };

  return (
    <div className="App">

      <div>
        <h1 style={{fontSize: "50px"}}>류수연은 예쁘다.</h1>
      </div>
      
      <div className="LR">
        <div style={{ color: "green" }} onClick={handleClick}>인정</div>
        <div style={{ color: "red" }} onClick={handleRedClick}>노인정</div>
      </div>

      {fullScreen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            position: "absolute",
            top: "0%",
            width: "100%",
            textAlign: "center",
            color: "rgb(255, 192, 203)",
            fontSize: "2rem"
          }}>
            ❤️너가 더 예뻐❤️<br></br>
            ❤️귀여운 수연이 보고가❤️
          </div>
          <img src={require('./kidsue.jpg')} alt="Placeholder" style={{ width: "auto", height: "100%", maxWidth: "100%" }} />
        </div>
      )}

      {fullScreenRed && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            position: "absolute",
            top: "5%",
            width: "100%",
            textAlign: "center",
            color: "RED",
            fontSize: "2rem"
          }}>
            ☠️죽어☠️
          </div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoUzXmSCXAq1wNSO2TTdPMkJalR70T5o7JBwFNqmRU9rFhmdNwT5PXO0G4POy7nkZcXwY&usqp=CAU" alt="Placeholder" style={{ width: "auto", height: "100%", maxWidth: "100%" }} />
        </div>
      )}

      <div>글자를 누르시오</div>
      
    </div>
  );
}


export default App;
