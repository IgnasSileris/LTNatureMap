import { useState, useEffect } from 'react';
import BackgroundImage from './Components/BackgroundImage';
import ContentsBox from './Components/ContentsBox';
import './input.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginModal from './Components/LoginModal';
import SignupModal from './Components/SignupModal';
import MapView from './Components/MapView';
import FeedView from './Components/FeedView';
import RankingsView from './Components/RankingsView';
import SearchView from './Components/SearchView';
import { useLocationStateStore } from './stores/locationStateStore';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteSetup from './Components/RouteSetup';

function App() {

  return (
    <Router>
      <RouteSetup/>
    </Router>
);
}

export default App
