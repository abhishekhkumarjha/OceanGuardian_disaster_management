import React, { useState, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";

export default function LocationPicker({ value, onChange, latitude, longitude, onCoordinateChange }) {
  const handleMapClick = () => {
    if (latitude && longitude) {
      // Open in Google Maps for better interaction
      window.open(`https://www.google.com/maps/@${latitude},${longitude},15z`, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Location Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location or address"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
      
      {/* Interactive Map Display */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Map Location</label>
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          {latitude && longitude ? (
            <div className="relative">
              {/* OpenStreetMap Embed (Free, no API key needed) */}
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`}
                width="100%"
                height="250"
                style={{ border: 0 }}
                className="w-full h-60 sm:h-64 md:h-72"
                title="Location Map"
              ></iframe>
              
              {/* Map Info Overlay */}
              <div className="absolute top-2 left-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm shadow-md">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-red-500 mr-1" />
                  <span className="font-medium text-slate-700">
                    {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-60 sm:h-64 md:h-72 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center">
              <MapPin className="w-12 h-12 text-slate-400 mb-3" />
              <p className="text-slate-600 text-sm text-center px-4">
                Enter coordinates below to see the location on the map
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Map will appear automatically when you add coordinates
              </p>
            </div>
          )}
        </div>
        
        {latitude && longitude && (
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-xs">
            <button
              onClick={handleMapClick}
              className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
            >
              <Navigation className="w-3 h-3 mr-1" />
              Open in Google Maps
            </button>
            <span className="text-slate-500">
              Zoom and pan available in full map view
            </span>
          </div>
        )}
      </div>
      
      {/* Coordinate Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
          <input
            type="number"
            step="any"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 17.385044"
            value={latitude || ""}
            onChange={(e) => onCoordinateChange && onCoordinateChange('latitude', parseFloat(e.target.value) || null)}
          />
          <p className="text-xs text-slate-500 mt-1">North/South position</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
          <input
            type="number"
            step="any"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 78.486671"
            value={longitude || ""}
            onChange={(e) => onCoordinateChange && onCoordinateChange('longitude', parseFloat(e.target.value) || null)}
          />
          <p className="text-xs text-slate-500 mt-1">East/West position</p>
        </div>
      </div>
      
      <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
        <strong>Tip:</strong> Use the "Use Current Location" button above to automatically fill in your coordinates, or enter them manually if you know the exact location.
      </div>
    </div>
  );
}