import './Home.css';
import {Link } from "react-router-dom";
import L from 'leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
/////////////////////////////////////

function Play() {

  // MAP
  
  useEffect(() => {
    // Initialize the map
    var CRSPixel = L.Util.extend(L.CRS.Simple, {
      transformation: new L.Transformation(1,0,1,0)
  });
    var map = L.map('map',{ crs: CRSPixel }).setView([0, 0], 1);
    var bounds = [[-400,-400], [400,400]];
    // Add the image overlay
    L.imageOverlay('../images/gondwa.png', bounds).addTo(map);
    map.options.minZoom = 1;
    map.options.maxZoom = 6;  

    const defaultIcon = new L.icon({
      iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
      iconSize: [16, 24],
      iconAnchor: [8, 24],
      popupAnchor: [0, -2]
    });

    L.marker([-65,-180], {icon: defaultIcon}).addTo(map);







  }, []);

  const [gameStage, setGameStage] = useState(1);

  const Guess = () => {
  
  };

  return (
    <div className="PlayApp">
        <div id="playBody">
            <div id="top-bar"><h1><Link to="/">PathGuessr</Link></h1></div>
            <div id="play-container">
                <div id="guess-panel">
                    <img id="logo" src="images/logo.png" alt="PathGuessr"/>
                    <p>Location: {gameStage}/5</p>
                    <button id="guessButton" onClick={Guess}>Guess</button>
                    {gameStage === 5 && <p>DONE</p>}
                </div>
                <div id="map"></div>
            </div>
        </div>
    </div>
  );

  
}




export default Play;
