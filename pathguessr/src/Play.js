import './Home.css';
import {Link } from "react-router-dom";
import L, { map } from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { IoMdPin  } from "react-icons/io";
/////////////////////////////////////

function Play() {
  const [gameStage, setGameStage] = useState(1);
  const [guessMode, setGuessMode] = useState(true);
  const [currentImagePath, setCurrentImagePath] = useState('../images/locations/');
  const [currentImageInfo, setCurrentImageInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const mapRef = useRef(null);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const defaultIcon = new L.icon({
    iconUrl: require('../node_modules/leaflet/dist/images/pathMarker.png'),
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -2]
  });
  // MAP
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  useEffect(() => {
    
    // Initialize the map
    var CRSPixel = L.Util.extend(L.CRS.Simple, {
      transformation: new L.Transformation(1,0,1,0)
  });
    var map = L.map('map',{ crs: CRSPixel}, ).setView([0, 0], 1);
    var bounds = [[-400,-400], [400,400]];
    // Add the image overlay
    L.imageOverlay('../images/gondwa.png', bounds).addTo(map);
    map.options.minZoom = 1;
    map.options.maxZoom = 6; 
    map.setMaxBounds(bounds);
    map.on('click', onMapClick);
    

    mapRef.current = map;
    getRandomImagePath();
    
  }, []);
  
  // Create a context for images in the public/images/locations folder
  
  const getRandomImagePath = () => {
    const images = require.context('../public/images/locations', true);
    const imagePaths = images.keys();
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    const fileName = imagePaths[randomIndex].replace('./', '');
    setCurrentImagePath(`../images/locations/${fileName}`);
    setCurrentImageInfo(extractFileInfo(fileName));
};

useEffect(() => {
}, [currentImageInfo]);

  
 //Filename info extraction function
 function extractFileInfo(filename) {
  var parts = filename.split(/[xy.]/);
  var xCoord = parseInt(parts[1], 10);
  var yCoordPart = parts[2].match(/-?\d+/);
  var yCoord = parseInt(yCoordPart[0], 10);
  var regionCode = parts[2].match(/[a-zA-Z]+/);
  return [xCoord, yCoord, regionCode[0]];
}

// Region dictionary
const regionDictionary = {
  'as': 'Azure Shore',
  'ba': 'Barrens',
  'bql': 'Big Quill Lake',
  'bw': 'Birchwoods',
  'bc': 'Bleached Corals',
  'btc': 'Broken Tooth Canyon',
  'bf': 'Burned Forest',
  'ci': 'Castaway Isle',
  'dw': 'Dark Woods',
  'dc': 'Deepsea Crags',
  'ds': 'Deepsea Spires',
  'dp': 'Desolate Pass',
  'dl': 'Dried Lake',
  'fb': 'Flyers Bluff',
  'gk': 'Golden Kelp',
  'gop': 'Golden Plateau',
  'gp': 'Grand Plains',
  'gh': 'Green Hills',
  'gv': 'Green Valley',
  'he': 'Hoodoo Expanse',
  'hs': 'Hot Springs',
  'ht': 'Hunters Thicket',
  'ic': 'Impact Crater',
  'kf': 'Kelp Forest',
  'li': 'Lonely Isle',
  'tm': 'The Mudflats',
  'op': 'Ocean Pillars',
  'os': 'Ocean Stacks',
  'pi': 'Pebble Isle',
  'rh': 'Rainbow Hills',
  'ri': 'Red Island',
  'rkf': 'Red Kelp Forest',
  'rr': 'Red Reef',
  'rb': 'Ripple Beach',
  'rfh': 'Rockfall Hill',
  'si': 'Sanctuary Isle',
  'sc': 'Sand Caverns',
  'sf': 'Salt Flats',
  'sgl': 'Savanna Grassland',
  'sb': 'Seagrass Bay',
  'stm': 'Sharptooth Marsh',
  'sg': 'Snake Gully',
  'sm': 'Stego Mountain',
  'sh': 'Sunken Hoodoos',
  'ss': 'Sweetwater Shallows',
  'tt': 'The Teeth',
  'tp': 'Titan\'s Pass',
  'tf': 'Triad Falls',
  'vb': 'Volcano Bay',
  'wp': 'Wilderness Peak',
  'wco': 'Whistling Columns',
  'wc': 'White Cliffs',
  'yg': 'Young Grove'
};

function onMapClick(e) {
  var markerCounter = 0;
  var existingMarker = null;

  // Count markers and find the existing one
  mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
          markerCounter++;
          existingMarker = layer;
      }
  });

  if (markerCounter === 1) {
      // Make the existing marker draggable and move it to the clicked location
      existingMarker.setLatLng(e.latlng);
      existingMarker.dragging.enable();
  } else if (markerCounter === 0) {
      // Create a new draggable marker at the clicked location
      var guessMarker = L.marker(e.latlng, { draggable: true, icon:defaultIcon }).addTo(mapRef.current);
  }
}

  
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const deltaX = lat2 - lat1;
      const deltaY = lon2 - lon1;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      return 10*distance;
    }
  
  const Guess = () => { 
    setGuessMode(false);
    if (gameStage<6) {
      let guessMarker = null;

      // Iterate through the layers to find the marker
      mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
              guessMarker = layer;
          }
          if (guessMarker) {
            // Do something with guessMarker
            guessMarker.dragging.disable();
            const markerLatLng = guessMarker.getLatLng();
            let distance = calculateDistance(markerLatLng.lat,markerLatLng.lng,currentImageInfo[0],currentImageInfo[1]);
            const secondMarkerLatLng = L.latLng(currentImageInfo[0], currentImageInfo[1]);
            const secondMarker = L.marker(secondMarkerLatLng, {icon:defaultIcon}).addTo(mapRef.current);
            document.getElementById('distance').textContent = distance;
            const lineCoordinates = [guessMarker.getLatLng(), secondMarker.getLatLng()];
            const line = L.polyline(lineCoordinates, { color: '#a32904' }).addTo(mapRef.current);
        }
      });
    }  
  };

  const Next = () => {
    if (gameStage<5) {
      setGuessMode(true);
      getRandomImagePath();
      setGameStage(gameStage+1);
      document.getElementById('distance').textContent = '';
      if (mapRef.current) {
        mapRef.current.setView([0, 0], 1);
        mapRef.current.eachLayer(layer => {
            if (layer instanceof L.Polyline || layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });
    }
    }
  }

  return (
    <div className="PlayApp">
        <div id="playBody">
            <div id="top-bar"><h1><Link to="/">PathGuessr</Link></h1></div>
            <div id="play-container">
                <div id="guess-panel">
                    <img id="logo" src="images/logo.png" alt="PathGuessr"/>
                    <p id="locP"><IoMdPin color='#d43504' size='30'/>&nbsp;Location: {gameStage}/5</p>
                    <img id="imagePreview" src={currentImagePath} width="600px" onClick={openModal}/>
                    {guessMode && <p><i><small>You can click on the image to enlarge it</small></i></p>}
                    {guessMode && <button id="guess-button" onClick={Guess}>Guess</button>}
                    {!guessMode && <p> </p>}
                    {!guessMode && <p>The location was in: {regionDictionary[currentImageInfo[2]]}</p>}
                    {!guessMode && gameStage < 5 && <button id="next-button" onClick={Next}>Next</button>}
                    <p id="distance">Marker Coordinates: </p>
                    
                </div>
                <div id="map" ref={mapRef}></div>
            </div>
        </div>
        {showModal && (
        <div className="modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={currentImagePath} />
        </div>
      )}
    </div>
  );

  
}




export default Play;
