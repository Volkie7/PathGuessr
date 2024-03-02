import './Home.css';
import {Link } from "react-router-dom";
import L from 'leaflet';
import { MapContainer, TileLayer, useMap} from 'react-leaflet'
import { useEffect } from 'react';

function Play() {

  useEffect(() => {
    // Initialize the map
    var map = L.map('map-container').setView([0, 0], 2);

    // Add the image overlay
    L.imageOverlay('../images/gondwa.png', [[-90, -180], [90, 180]]).addTo(map);

    // Set the bounds of the map
    map.setMaxBounds([[-90, -180], [90, 180]]);
  }, []);




  return (
    <div className="PlayApp">
        <div id="playBody">
            <div id="top-bar"><h1><Link to="/">PathGuessr</Link></h1></div>
            <div id="play-container">
                <div id="guess-panel">
                    <img id="logo" src="images/logo.png" alt="PathGuessr"/>
                </div>
                <div id="map-container"></div>
            </div>
        </div>
    </div>
  );

  
}




export default Play;
