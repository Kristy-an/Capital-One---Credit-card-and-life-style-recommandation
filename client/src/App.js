import React from 'react';
import logo from './images/logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css'; // uncomment to enable bootstrap
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  /** 
   * Kevin: This is just to test sending a message to the frontend from the backend
   * We could remove this also.
   */
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/status") // 
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      {/* Feel free to remove this, the paragraph below is just to ensure that the backend is also running
        If it saids offline, just run "npm start" on the backend folder in another terminal - Kevin
      */}
      {/* <p>Backend: {!data ? <span style={{color: "red"}}>OFFLINE</span> : <span style={{color: "green"}}>{data}</span>}</p> */}
    </div>
  );
}

export default App;
