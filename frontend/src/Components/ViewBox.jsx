import React from 'react';
import MapView from './MapView';
import FeedView from './FeedView';
import RankingsView from './RankingsView';
import SearchView from './SearchView';
import { Routes, Route, Navigate } from 'react-router-dom';

function ViewBox() {
    return (
        <div className="flex border bg-white justify-center items-center" style={{width: '100%', height: '90%'}}>
            <Routes>
                <Route path="/*" element={<Navigate to="/Map" />} />
                <Route path="/Map" Component={MapView}/>
                <Route path="/Feed" Component={FeedView}/>
                <Route path="/Rankings" Component={RankingsView}/>
                <Route path="/Search" Component={SearchView}/>
            </Routes>
        </div>
    );
}

export default ViewBox;