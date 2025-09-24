import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	AlertTriangle,
	Shield,
	Clock,
	Activity,
	TrendingUp,
	MessageSquare,
	Anchor
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const StatCard = ({ title, value, icon: Icon, color, trend, isLoading }) => {
	if (isLoading) {
		return (
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-8 w-16" />
						</div>
						<Skeleton className="w-12 h-12 rounded-xl" />
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="hover:shadow-md transition-shadow duration-200">
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
						<p className="text-3xl font-bold text-slate-900">{value}</p>
						{trend && (
							<div className="flex items-center gap-1 mt-2">
								<TrendingUp className="w-4 h-4 text-green-500" />
								<span className="text-sm text-green-600">{trend}</span>
							</div>
						)}
					</div>
					<div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
						<Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function StatsOverview({
	totalReports,
	verifiedReports,
	pendingReports,
	activeSafeZones,
	isLoading
}) {
	const verificationRate = totalReports > 0 ? ((verifiedReports / totalReports) * 100).toFixed(1) : 0;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<StatCard
				title="Total Reports"
				value={totalReports}
				icon={AlertTriangle}
				color="bg-blue-500"
				isLoading={isLoading}
			/>

			<StatCard
				title="Verified Reports"
				value={`${verifiedReports} (${verificationRate}%)`}
				icon={Shield}
				color="bg-green-500"
				isLoading={isLoading}
			/>

			<StatCard
				title="Pending Review"
				value={pendingReports}
				icon={Clock}
				color="bg-orange-500"
				isLoading={isLoading}
			/>

			<StatCard
				title="Active Safe Zones"
				value={activeSafeZones}
				icon={Anchor}
				color="bg-teal-500"
				isLoading={isLoading}
			/>
		</div>
	);
}