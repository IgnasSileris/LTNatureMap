import React from 'react';
import { useState, useEffect } from 'react';
import BackgroundImage from './BackgroundImage';
import ContentsBox from './ContentsBox';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import MapView from './MapView';
import FeedView from './FeedView';
import RankingsView from './RankingsView';
import SearchView from './SearchView';
import { useLocationStateStore } from '../stores/locationStateStore';

function RouteSetup() {
    const location = useLocation();
    const locationState = useLocationStateStore((state) => state.locationState);

    return (
        <div className="relative flex justify-center items-center h-screen">
          <Routes location={locationState || location}>
            <Route element={<BackgroundImage />} >
                 <Route element={<ContentsBox />}>
                    <Route path="/" element={<Navigate to="/Map" />} />
                    <Route path="/Map" element={<MapView />} />
                    <Route path="/Feed" element={<FeedView />} />
                    <Route path="/Rankings" element={<RankingsView />} />
                    <Route path="/Search" element={<SearchView />} />
                 </Route>
                    <Route path="/login" element= {<LoginModal/>}/>
                    <Route path="/signup" element= {<SignupModal/>}/>
            </Route>
          </Routes>
          {locationState && (
            <Routes>
                <Route path="/login" element= {<LoginModal/>}/>
                <Route path="/signup" element= {<SignupModal/>}/>
            </Routes>
          )}
        </div>
  );
  }

export default RouteSetup;