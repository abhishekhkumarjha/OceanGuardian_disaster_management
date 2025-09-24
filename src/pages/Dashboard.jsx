import React, { useState, useEffect } from "react";
import { HazardReport, SocialMediaAnalytics, User, SafeZone } from "../entities/all";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { AlertTriangle, MapPin, TrendingUp, Users, Activity, Waves, Shield, Clock, BarChart3, Plus } from "lucide-react";
import { format } from "date-fns";
import StatsOverview from "../components/dashboard/StatsOverview";
import InteractiveMap from "../components/dashboard/InteractiveMap";
import RecentReports from "../components/dashboard/RecentReports";
import SentimentAnalysis from "../components/dashboard/SentimentAnalysis";
import EmergencyAlerts from "../components/dashboard/EmergencyAlerts";

export default function Dashboard() {
			// Simulate loading and data for demo
			const isLoading = false;
			const totalReports = 5;
			const verifiedReports = 3;
			const pendingReports = 2;
			const activeSafeZones = 3;
			const emergencyReports = [
				{
					id: 1,
					title: "Tsunami",
					hazard_type: "tsunami",
					severity: "high",
					description: "Stay Alert Guys!!",
					location_description: "Current location",
					created_date: new Date(),
					affected_population: 4
				},
				{
					id: 2,
					title: "Storm surge alert - Visakhapatnam coast",
					hazard_type: "storm_surge",
					severity: "high",
					description: "Cyclonic conditions causing significant storm surge. Water levels risen by 2 feet above normal high tide mark. Coastal areas experiencing flooding.",
					location_description: "Visakhapatnam coastline",
					created_date: new Date(),
					affected_population: 200
				}
			];
			return (
				<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
					<div className="p-4 md:p-8">
						<div className="max-w-7xl mx-auto space-y-8">
							{/* Header */}
							<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
								<div>
									<h1 className="text-3xl font-bold text-slate-900 mb-2">Ocean Hazard Dashboard</h1>
									<p className="text-slate-600">Real-time monitoring and crowdsourced hazard reporting</p>
									<div className="flex items-center gap-2 mt-2">
										<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
										<span className="text-sm text-slate-500">Live monitoring active</span>
									</div>
								</div>
											<div className="flex gap-2">
												<button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">24 Hours</button>
												<button className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold border">7 Days</button>
												<button className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold border">30 Days</button>
																<Link to="/report">
																	<button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">+ Report Hazard</button>
																</Link>
											</div>
							</div>

							{/* Emergency Alerts */}
							<div className="space-y-4">
								<h2 className="text-xl font-bold text-red-900 flex items-center gap-2">
									<span className="inline-block"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3l-8.47-14.14a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg></span>
									Emergency Alerts ({emergencyReports.length})
								</h2>
								{emergencyReports.map((report) => (
									<div key={report.id} className="border border-red-200 bg-red-50 rounded-xl p-6 mb-4">
										<div className="flex flex-col gap-2 mb-2">
											<div className="flex items-center gap-2">
												<span className="font-bold text-red-900 text-lg">{report.title}</span>
												<span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">{report.hazard_type.replace(/_/g, ' ')}</span>
												<span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">{report.severity}</span>
											</div>
											<div className="text-red-800 mb-3 text-sm leading-relaxed">{report.description}</div>
											<div className="grid grid-cols-2 gap-3 text-xs text-red-700 mb-2">
												<div className="flex items-center gap-1">
													<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700"><path d="M21 10.5a8.38 8.38 0 0 1-1.9.5 3.5 3.5 0 1 0-6.6 0 8.38 8.38 0 0 1-1.9-.5"></path><path d="M2.27 6.96A8.5 8.5 0 1 1 12 20.5"></path></svg>
													<span>{report.location_description}</span>
												</div>
												<div className="flex items-center gap-1">
													<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
													<span>{report.created_date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
												</div>
											</div>
											{report.affected_population > 0 && (
												<div className="text-xs text-red-700 mb-2">{report.affected_population} people affected</div>
											)}
										</div>
										<div className="flex gap-2 pt-3 mt-3 border-t border-red-200">
											<button className="flex-1 border border-red-300 text-red-700 bg-white rounded-lg px-4 py-2 font-semibold">Contact</button>
											<button className="flex-1 bg-red-600 text-white rounded-lg px-4 py-2 font-semibold">View Details</button>
										</div>
									</div>
								))}
								<div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
									<p className="text-red-800 font-medium mb-2">Emergency Response Protocol</p>
									<div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-red-700">
										<span>For life-threatening situations, call <strong>108</strong> immediately.</span>
										<span className="hidden sm:inline">|</span>
										<span>INCOIS Control Room: <strong>040-23895000</strong></span>
									</div>
								</div>
							</div>

							{/* Stats Overview */}
							<StatsOverview 
								totalReports={totalReports}
								verifiedReports={verifiedReports}
								pendingReports={pendingReports}
								activeSafeZones={activeSafeZones}
								isLoading={isLoading}
							/>

							{/* Main Content Grid */}
							<div className="grid lg:grid-cols-3 gap-8">
								{/* Interactive Map - Takes 2 columns */}
								<div className="lg:col-span-2">
									<InteractiveMap />
								</div>
								{/* Sidebar Content */}
								<div className="space-y-6">
									<SentimentAnalysis />
									<RecentReports />
								</div>
							</div>
						</div>
					</div>
				</div>
			);
}
