import './Home.css';
import {Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div id="mainBody">
        <div id="top-bar"><h1><Link to="/">PathGuessr</Link></h1></div>
        <div id="menu">
            <img id="logo" src="images/logo.png" alt="PathGuessr"/>
            <p>Welcome to PathGuessr - Gondwa</p>
            <Link to="/game"><button id="play-button">Play</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
