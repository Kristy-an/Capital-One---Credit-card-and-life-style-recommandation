import React from "react";
import {Outlet} from "react-router-dom";
import App from "../App";
import CapitalOne from "../images/CapitalOne.png";
import "./Layout.css";
const Layout = () => {
  return (
    <>
      <App />
      <div class="navBar">
      <a href="https://www.capitalone.com" target="_blank" rel="noreferrer">
        <img class="navImg" src={CapitalOne}/>
      </a>
        <div class="navLinks">
            <div> </div>
            <a style={{color: 'black'}} href={"https://www.capitalone.com/credit-cards/"}>Credit Cards</a>
            <div> </div>
            <a style={{color: 'black'}} href={"https://www.capitalone.com/bank"}>Checkings & Savings</a>
            <div> </div>
            <a style={{color: 'black'}} href={"https://www.capitalone.com/auto-financing/"}>Auto</a>
            <div> </div>
            <a style={{color: 'black'}} href={"https://www.capitalone.com/small-business/homepage/"}>Buiness</a>
            <div> </div>
            <a style={{color: 'black'}} href={"https://www.capitalone.com/commercial/"}>Commercial</a>
            <div> </div>
            <a style={{color: 'black'}} href={"https://www.capitalone.com/learn-grow/"}>Learn & Grow</a>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;