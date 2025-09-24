import React from 'react';
// ...full code from context above...
export default function SentimentAnalysis() {
		// Demo data
		const sentiment = {
			mood: "positive",
			mentions: 4,
			breakdown: [
				{ label: "Positive", value: 1, color: "bg-green-400" },
				{ label: "Negative", value: 1, color: "bg-red-400" },
				{ label: "Neutral", value: 0, color: "bg-gray-400" },
				{ label: "Panic", value: 1, color: "bg-orange-400" },
			],
		};
		return (
			<div className="bg-white p-4 rounded-xl shadow">
				<h2 className="text-lg font-bold mb-2">Social Media Sentiment</h2>
				<div className="flex items-center gap-2 mb-2">
					<span className="text-sm font-semibold">Overall Mood</span>
					<span className={`px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 ml-2`}>{sentiment.mood}</span>
					<span className="ml-auto text-sm font-semibold">{sentiment.mentions} mentions</span>
				</div>
				<div className="space-y-2">
					{sentiment.breakdown.map((item) => (
						<div key={item.label} className="flex items-center gap-2 text-xs">
							<span className="w-16 font-medium">{item.label}</span>
							<span className={`flex-1 h-2 rounded ${item.color}`} style={{ width: `${item.value * 40}px` }} />
							<span className="ml-2 font-bold">{item.value}</span>
						</div>
					))}
				</div>
			</div>
		);
}