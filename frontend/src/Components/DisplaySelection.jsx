import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faBars, faRankingStar, faMagnifyingGlass, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useDisplayModeStore } from '../stores/displayModeStore';

function SelectionButton(props) {
    const changeMode = useDisplayModeStore(state => state.changeMode)

    const routeLink = "/" + props.name;
    const location = useLocation();
    const bgColor = location.pathname === routeLink ? 'relative border-solid  border bg-rose-500 p-4 rounded-md' : 'relative border-solid border bg-rose-400 hover:bg-rose-500 p-4 rounded-md';

    return (
        <Link to={routeLink} style={{ textDecoration: 'inherit', color: 'inherit' }}>
            <button title={props.title} className={bgColor} onClick={() => changeMode(props.name)}>
                <FontAwesomeIcon icon={props.icon} className="w-4 h-4" />
                <span> {props.name}</span>
                {location.pathname === routeLink && (<div className="absolute left-0 bottom-0 bg-black opacity-60 w-full h-1 rounded-xl"></div>)}
            </button>
        </Link>
    );
}
function DisplaySelection() {
    return (
        <div className="flex-initial">
            <SelectionButton name = "Map" title = "Switch to map view" icon = {faMap}/>
            <SelectionButton name = "Feed" title = "Switch to feed view" icon = {faBars}/>
            <SelectionButton name = "Rankings" title = "Switch to rankings and leaderboards" icon = {faRankingStar}/>
            <SelectionButton name = "Search" title = "Search for posts or authors" icon = {faMagnifyingGlass}/>
        </div>
    );
}

export default DisplaySelection;