import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LAYER_OPTIONS = ["Hazards", "Safe Zones", "Social", "All Layers"];

export default function InteractiveMap() {
	const mapRef = useRef(null);
	const [selectedLayer, setSelectedLayer] = useState("Hazards");
			useEffect(() => {
				let map;
				if (mapRef.current && !mapRef.current._leaflet_id) {
					map = L.map(mapRef.current).setView([15.5, 80.5], 6);
					L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
						attribution: '&copy; OpenStreetMap contributors',
					}).addTo(map);
				} else if (mapRef.current && mapRef.current._leaflet_id) {
					map = mapRef.current._leaflet_map;
				}
				if (map) {
					map.eachLayer((layer) => {
						if (layer instanceof L.Marker) map.removeLayer(layer);
					});
					// Layer-based demo markers
					const layerMarkers = {
						"Hazards": [
							{ name: "Chennai (Tsunami)", coords: [13.0827, 80.2707] },
							{ name: "Visakhapatnam (Storm Surge)", coords: [17.6868, 83.2185] },
						],
						"Safe Zones": [
							{ name: "Kolkata (Safe Zone)", coords: [22.5726, 88.3639] },
							{ name: "Mumbai (Safe Zone)", coords: [19.0760, 72.8777] },
						],
						"Social": [
							{ name: "Goa (Social Mention)", coords: [15.2993, 74.1240] },
						],
						"All Layers": [
							{ name: "Chennai (Tsunami)", coords: [13.0827, 80.2707] },
							{ name: "Visakhapatnam (Storm Surge)", coords: [17.6868, 83.2185] },
							{ name: "Kolkata (Safe Zone)", coords: [22.5726, 88.3639] },
							{ name: "Mumbai (Safe Zone)", coords: [19.0760, 72.8777] },
							{ name: "Goa (Social Mention)", coords: [15.2993, 74.1240] },
						],
					};
					(layerMarkers[selectedLayer] || []).forEach((place) => {
						L.marker(place.coords).addTo(map).bindPopup(place.name);
					});
				}
				// Store map instance for later
				if (mapRef.current && !mapRef.current._leaflet_map) {
					mapRef.current._leaflet_map = map;
				}
			}, [selectedLayer]);
	return (
		<div className="bg-white rounded-xl shadow p-4 min-h-[350px] flex flex-col">
			<h2 className="text-lg font-bold mb-2">Interactive Hazard Map</h2>
			<div className="flex gap-2 mb-2">
				{LAYER_OPTIONS.map((layer) => (
					<button
						key={layer}
						className={`px-3 py-1 rounded font-semibold border transition-colors duration-150 ${selectedLayer === layer ? "bg-blue-100 text-blue-700 border-blue-400" : "bg-white text-blue-700 border"}`}
						onClick={() => setSelectedLayer(layer)}
					>
						{layer}
					</button>
				))}
				<button className="ml-auto px-3 py-1 rounded bg-slate-100 text-slate-700 font-semibold">Filter</button>
			</div>
			<div className="flex-1 rounded-lg overflow-hidden border">
				<div ref={mapRef} style={{ height: "300px", width: "100%" }} />
				<div className="mt-2 text-xs text-blue-700">Showing: <span className="font-bold">{selectedLayer}</span> layer</div>
			</div>
		</div>
	);
}