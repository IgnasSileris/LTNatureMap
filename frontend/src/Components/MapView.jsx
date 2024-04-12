import React from 'react';
import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import LTBoundary from "../Extras/LT-Borders_simplified.json";

const LTCenter = [55.1694, 23.8813];
const maxBounds = [
    [ 53.85, 20.5],
    [ 56.5, 26.9],
];
const outerRectangle = [
    [30, 50],
    [30, 60],
    [18, 60],
    [18, 50],
    [30, 50],
];
const LTBorderPolygon = LTBoundary.features[0].geometry.coordinates[0][0];
const compositeShape = {
    type: 'Feature',
    geometry: {
        type: 'Polygon',
        coordinates: [outerRectangle, LTBorderPolygon]
    }
};
const inBoundsStyle = ()=> {
    return {
      fillColor: "darkgreen",
      weight: 1,
      opacity: 1,
      color: "green",
      fillOpacity: 0.2
    };
  };
const outBoundsStyle = ()=> {
    return {
      fillColor: "gray",
      weight: 0,
      opacity: 1,
      fillOpacity: 0.9
    };
  };
function MapView() {
    return (
        <div className="w-full h-full border border-black">
            <MapContainer id="map" center={LTCenter} zoomSnap = {0.5} zoom={7.5} minZoom={7.5} maxBounds={maxBounds} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
                <GeoJSON data={LTBoundary} style={inBoundsStyle} />
                <GeoJSON data={compositeShape} style={outBoundsStyle} />
            </MapContainer>
        </div>
    );
}
export default MapView;