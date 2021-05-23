import React from "react";
import { Route, Switch } from "react-router";

import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Rooms } from "./pages/Rooms";
import SingleRooms from "./pages/SingleRooms";
import {Navbar} from "./components/Navbar";

import './App.css';

function App() {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/rooms/" component={Rooms} />
      <Route exact path="/rooms/:slug" component={SingleRooms} />
      {/* en caso que no  hay ninguno */}
      <Route component={Error} />   
    </Switch>

    </>
  );
}

export default App;
