import React from 'react';
// ...full code from context above...
export default function RecentReports() {
			// Demo data
			const reports = [
				{ id: 1, type: "Tsunami", location: "Chennai", date: "Sep 23, 16:55", color: "bg-red-100 text-red-800", icon: "🌊" },
				{ id: 2, type: "Storm Surge", location: "Visakhapatnam", date: "Sep 23, 08:43", color: "bg-orange-100 text-orange-800", icon: "🌪️" },
				{ id: 3, type: "Flood", location: "Kolkata", date: "Sep 22, 19:10", color: "bg-blue-100 text-blue-800", icon: "💧" },
			];
			return (
				<div className="bg-white p-4 rounded-xl shadow">
					<h2 className="text-lg font-bold mb-2">Recent Reports</h2>
					<div className="space-y-3">
						{reports.map((report) => (
							<div key={report.id} className={`flex items-center gap-3 p-3 rounded-lg border ${report.color}`}>
								<span className="text-xl">{report.icon}</span>
								<div className="flex-1 min-w-0">
									<div className="font-semibold text-sm truncate">{report.type}</div>
									<div className="text-xs text-slate-500 truncate">{report.location}</div>
								</div>
								<span className="text-xs text-slate-400 ml-auto">{report.date}</span>
							</div>
						))}
					</div>
				</div>
			);
}