import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="mainContainer">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello ,Dev</span>
              </p>
              <p>How can i help you</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>suggest some beautiful places</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>suggest some beautiful places</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>suggest some beautiful places</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>suggest some beautiful places</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="resultTitle">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="resultData">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p>{resultData}</p>
              )}
            </div>
          </div>
        )}

        <div className="mainBottom">
          <div className="searchBox">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="enter prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottomInfo">Gemini clone</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
