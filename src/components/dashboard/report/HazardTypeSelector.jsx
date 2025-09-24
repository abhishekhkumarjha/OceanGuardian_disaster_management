import React from "react";

const hazardTypes = [
  { label: "Tsunami", value: "tsunami", icon: <span className="text-red-400">&#x1F30A;</span>, desc: "Large ocean waves caused by seismic activity" },
  { label: "Storm Surge", value: "storm_surge", icon: <span className="text-orange-400">&#x1F32C;</span>, desc: "Abnormal rise in sea level during storms" },
  { label: "High Waves", value: "high_waves", icon: <span className="text-blue-400">&#x1F30A;</span>, desc: "Unusually large waves affecting coastal areas" },
  { label: "Swell Surge", value: "swell_surge", icon: <span className="text-indigo-400">&#x2191;</span>, desc: "Long-period waves from distant storms" },
  { label: "Coastal Current", value: "coastal_current", icon: <span className="text-teal-400">&#x1F6E9;</span>, desc: "Strong nearshore water currents" },
  { label: "Unusual Tidal Event", value: "tidal_event", icon: <span className="text-purple-400">&#x223F;</span>, desc: "Abnormal tidal patterns or levels" },
  { label: "Coastal Erosion", value: "coastal_erosion", icon: <span className="text-yellow-400">&#x26F0;</span>, desc: "Rapid loss of coastal land or beach" },
  { label: "Sea Level Rise", value: "sea_level_rise", icon: <span className="text-green-400">&#x2193;</span>, desc: "Observed increase in local sea level" },
  { label: "Oil Spill", value: "oil_spill", icon: <span className="text-gray-600">&#x1F6C1;</span>, desc: "Release of petroleum products into ocean" },
  { label: "Marine Debris", value: "marine_debris", icon: <span className="text-black">&#x1F5C3;</span>, desc: "Large accumulation of floating debris" },
  { label: "Other", value: "other", icon: <span className="text-slate-400">&#x26A0;</span>, desc: "Other ocean-related hazards not listed" },
];

export default function HazardTypeSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 mb-1">Hazard Type *</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hazardTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            className={`w-full text-left p-4 rounded-xl border transition-all duration-150 shadow-sm flex flex-col gap-2 ${value === type.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-400'} focus:outline-none`}
            onClick={() => onChange(type.value)}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{type.icon}</span>
              <span className="font-bold text-base text-slate-900">{type.label}</span>
            </div>
            <div className="text-sm text-slate-600">{type.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
