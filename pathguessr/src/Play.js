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


 //Filename info extraction function
 function extractFileInfo(filename) {
  var parts = filename.split(/[xy.]/);
  var xCoord = parseInt(parts[1], 10);
  var yCoordPart = parts[2].match(/-?\d+/);
  var yCoord = parseInt(yCoordPart[0], 10);
  var regionCode = parts[2].match(/[a-zA-Z]+/);
  return [xCoord, yCoord, regionCode[0]];
}

//Region dictionary (to revise)
  const regionDictionary = {
    'azure shore': 'AS',
    'barrens': 'bn',
    'big quill lake': 'bql',
    'birchwoods': 'bw',
    'bleached corals': 'bc',
    'broken tooth canyon': 'btc',
    'burned forest': 'bf',
    'castaway isle': 'ci',
    'dark woods': 'dw',
    'deepsea crags': 'dc',
    'deepsea spires': 'ds',
    'desolate pass': 'dp',
    'dried lake': 'dl',
    'flyers bluff': 'fb',
    'golden kelp': 'gk',
    'golden plateau': 'gp',
    'grand plains': 'gp',
    'green hills': 'gh',
    'green valley': 'gv',
    'hoodoo expanse': 'he',
    'hot springs': 'hs',
    'hunters thicket': 'ht',
    'impact crater': 'ic',
    'kelp forest': 'kf',
    'lonely isle': 'li',
    'the mudflats': 'tm',
    'ocean pillars': 'op',
    'ocean stacks': 'os',
    'pebble isle': 'pi',
    'rainbow hills': 'rh',
    'red island': 'ri',
    'red kelp forest': 'rkf',
    'red reef': 'rr',
    'ripple beach': 'rb',
    'rockfall hill': 'rh',
    'sanctuary isle': 'si',
    'sand caverns': 'sc',
    'salt flats': 'sf',
    'savanna grassland': 'sg',
    'seagrass bay': 'sb',
    'sharptooth marsh': 'sm',
    'snake gully': 'sg',
    'stego mountain': 'sm',
    'sunken hoodoos': 'sh',
    'sweetwater shallows': 'ss',
    'the teeth': 'tt',
    'titan\'s pass': 'tp',
    'triad falls': 'tf',
    'volcano bay': 'vb',
    'wilderness peak': 'wp',
    'whistling columns': 'wc',
    'white cliffs': 'wc',
    'young grove': 'yg'
};






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
