import React, { useState, useEffect } from "react";
import HazardTypeSelector from "../components/dashboard/report/HazardTypeSelector";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Camera, Image } from "lucide-react";
import LocationPicker from "../components/dashboard/report/LocationPicker";
// Add reloadHazard function and form state
// ...full code from context above...
export default function ReportHazard() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		title: "",
		description: "",
		type: "tsunami",
		location: "",
		media: [],
		date: "",
		contact: "",
		severity: "moderate",
		impact: "minimal",
		emergency: false,
		latitude: null,
		longitude: null,
		location_desc: "",
		affected_population: 0
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [currentLocation, setCurrentLocation] = useState(null);
	const [locationLoading, setLocationLoading] = useState(false);
	const [cameraModalOpen, setCameraModalOpen] = useState(false);

	// Fallback camera function using file input
	const handleCameraFallback = (type = 'photo') => {
		const input = document.createElement('input');
		input.type = 'file';
		
		if (type === 'photo') {
			input.accept = 'image/*';
		} else if (type === 'video') {
			input.accept = 'video/*';
		} else {
			input.accept = 'image/*,video/*';
		}
		
		input.capture = 'environment'; // Use back camera
		
		input.onchange = (e) => {
			const files = Array.from(e.target.files);
			if (files.length > 0) {
				setForm(prev => ({ ...prev, media: [...prev.media, ...files] }));
			}
		};
		
		input.click();
	};

	// Camera capture function
	const handleCameraCapture = () => {
		// Create a hidden input for camera capture
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*,video/*';
		input.capture = 'environment'; // Use back camera if available
		
		input.onchange = (e) => {
			const files = Array.from(e.target.files);
			if (files.length > 0) {
				setForm(prev => ({ ...prev, media: [...prev.media, ...files] }));
			}
		};
		
		input.click();
	};

	// Advanced camera capture with HTML5 Media API
	const handleAdvancedCamera = async (type = 'photo') => {
		try {
			// Check if browser supports camera API
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				alert('Camera access is not supported in your browser');
				return;
			}

			// Request camera access
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: 'environment' // Prefer back camera
				},
				audio: type === 'video' // Enable audio for video recording
			});

			// Create modal for camera preview
			const modal = document.createElement('div');
			modal.style.cssText = `
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,0.9);
				z-index: 1000;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			`;

			const video = document.createElement('video');
			video.style.cssText = `
				width: 90%;
				max-width: 500px;
				height: auto;
				border-radius: 10px;
			`;
			video.autoplay = true;
			video.playsInline = true;
			video.srcObject = stream;

			const buttonContainer = document.createElement('div');
			buttonContainer.style.cssText = `
				display: flex;
				gap: 20px;
				margin-top: 20px;
			`;

			const captureBtn = document.createElement('button');
			captureBtn.textContent = type === 'photo' ? '📷 Take Photo' : '🎥 Record Video';
			captureBtn.style.cssText = `
				background: #3b82f6;
				color: white;
				border: none;
				padding: 12px 24px;
				border-radius: 8px;
				font-size: 16px;
				cursor: pointer;
			`;

			const closeBtn = document.createElement('button');
			closeBtn.textContent = '❌ Close';
			closeBtn.style.cssText = `
				background: #ef4444;
				color: white;
				border: none;
				padding: 12px 24px;
				border-radius: 8px;
				font-size: 16px;
				cursor: pointer;
			`;

			let mediaRecorder;
			let isRecording = false;

			if (type === 'photo') {
				captureBtn.onclick = () => {
					const canvas = document.createElement('canvas');
					const context = canvas.getContext('2d');
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
					context.drawImage(video, 0, 0);
					
					canvas.toBlob((blob) => {
						const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
						setForm(prev => ({ ...prev, media: [...prev.media, file] }));
						cleanup();
					}, 'image/jpeg', 0.8);
				};
			} else {
				// Video recording setup
				mediaRecorder = new MediaRecorder(stream);
				const chunks = [];

				mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
				mediaRecorder.onstop = () => {
					const blob = new Blob(chunks, { type: 'video/webm' });
					const file = new File([blob], `video_${Date.now()}.webm`, { type: 'video/webm' });
					setForm(prev => ({ ...prev, media: [...prev.media, file] }));
					cleanup();
				};

				captureBtn.onclick = () => {
					if (!isRecording) {
						mediaRecorder.start();
						captureBtn.textContent = '⏹️ Stop Recording';
						captureBtn.style.background = '#ef4444';
						isRecording = true;
					} else {
						mediaRecorder.stop();
					}
				};
			}

			const cleanup = () => {
				stream.getTracks().forEach(track => track.stop());
				document.body.removeChild(modal);
			};

			closeBtn.onclick = cleanup;

			buttonContainer.appendChild(captureBtn);
			buttonContainer.appendChild(closeBtn);
			modal.appendChild(video);
			modal.appendChild(buttonContainer);
			document.body.appendChild(modal);

		} catch (error) {
			console.error('Camera access error:', error);
			if (error.name === 'NotAllowedError') {
				alert('Camera access denied. Please allow camera permissions and try again.');
			} else if (error.name === 'NotFoundError') {
				alert('No camera found on this device.');
			} else {
				alert('Error accessing camera: ' + error.message);
			}
		}
	};

	function reloadHazard() {
		setForm({ 
			title: "", 
			description: "", 
			type: "tsunami", 
			location: "", 
			media: [], 
			date: "", 
			contact: "",
			latitude: null,
			longitude: null,
			location_desc: "",
			affected_population: 0
		});
		setSubmitted(false);
		setError("");
		setLoading(false);
	}

	const getCurrentLocation = () => {
		setLocationLoading(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setCurrentLocation({ latitude, longitude });
					setForm(prev => ({
						...prev,
						latitude: latitude,
						longitude: longitude
					}));
					// Simple reverse geocoding fallback
					setForm(prev => ({
						...prev,
						location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
						location_desc: `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
					}));
					setLocationLoading(false);
				},
				(error) => {
					console.error("Error getting location:", error);
					alert("Unable to get your current location. Please enter coordinates manually.");
					setLocationLoading(false);
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 60000
				}
			);
		} else {
			alert("Geolocation is not supported by this browser.");
			setLocationLoading(false);
		}
	};							function handleChange(e) {
								const { name, value, type, checked } = e.target;
								setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
							}

					function handleTypeChange(type) {
						setForm((prev) => ({ ...prev, type }));
					}

	const handleLocationChange = (location) => {
		setForm((prev) => ({ ...prev, location }));
	};
	
	const handleCoordinateChange = (field, value) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};					function handleMediaChange(media) {
						setForm((prev) => ({ ...prev, media }));
					}

					function handleSubmit(e) {
						e.preventDefault();
						setError("");
						// Validation
						if (!form.title.trim()) {
							setError("Report Title is required.");
							return;
						}
						if (!form.description.trim()) {
							setError("Detailed Description is required.");
							return;
						}
						if (!form.type) {
							setError("Hazard Type is required.");
							return;
						}
						if (!form.location.trim()) {
							setError("Location is required.");
							return;
						}
						setLoading(true);
						setTimeout(() => {
							setLoading(false);
							setSubmitted(true);
						}, 1200);
					}

					return (
						<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
							<div className="max-w-3xl mx-auto py-10">
								{/* Header */}
										<div className="flex items-center gap-4 mb-6">
											<button className="p-2 rounded hover:bg-slate-100" aria-label="Go back" onClick={() => navigate(-1)}>
												<ArrowLeft className="w-5 h-5 text-slate-700" />
											</button>
											<div>
												<h1 className="text-3xl font-bold text-slate-900">Report Ocean Hazard</h1>
												<p className="text-slate-600">Help protect our coastal communities by reporting observed hazards</p>
											</div>
										</div>
								{/* Emergency Banner */}
								<div className="mb-6">
									<div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 font-medium">
										<span className="font-bold">Emergency Situation?</span> For immediate life-threatening situations, call emergency services (108) first, then submit your report.
									</div>
								</div>
								{/* Card Section */}
								<div className="bg-white rounded-2xl shadow-xl p-8">
									<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
										<span className="inline-block"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="10" cy="10" r="9" /><line x1="10" y1="6" x2="10" y2="10" /><circle cx="10" cy="14" r="1" /></svg></span>
										Basic Information
									</h2>
												{submitted ? (
													<div className="space-y-4 text-center">
														<div className="text-green-600 font-bold text-lg">Hazard report submitted!</div>
														<button onClick={reloadHazard} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">Reload Hazard Form</button>
													</div>
												) : (
													<form className="space-y-6" onSubmit={handleSubmit} aria-label="Report Hazard Form">
														{error && <div className="text-red-600 font-medium mb-2">{error}</div>}
														<div>
															<label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Report Title *</label>
															<input name="title" id="title" value={form.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="Brief description of what you observed" required aria-required="true" />
														</div>
														<div>
															<label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Detailed Description *</label>
															<textarea name="description" id="description" value={form.description} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="Provide detailed information about the hazard you observed..." required aria-required="true" />
														</div>
																						{/* Hazard Type Selector */}
																						<HazardTypeSelector value={form.type} onChange={handleTypeChange} />
																						{/* Severity Level & Impact Level */}
																						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
																							<div>
																								<label htmlFor="severity" className="block text-sm font-medium text-slate-700 mb-1">Severity Level *</label>
																								<select name="severity" id="severity" value={form.severity} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-yellow-700">
																									<option value="none">None</option>
																									<option value="moderate">Moderate - Noticeable concern</option>
																									<option value="significant">Significant - High concern</option>
																									<option value="severe">Severe - Immediate danger</option>
																								</select>
																							</div>
																							<div>
																								<label htmlFor="impact" className="block text-sm font-medium text-slate-700 mb-1">Impact Level</label>
																								<select name="impact" id="impact" value={form.impact} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
																									<option value="none">No impact observed</option>
																									<option value="minimal">Minimal impact</option>
																									<option value="moderate">Moderate impact</option>
																									<option value="significant">Significant impact</option>
																									<option value="severe">Severe impact</option>
																								</select>
																							</div>
																						</div>
																						{/* Emergency Checkbox */}
																						<div className="flex items-center gap-2 mt-4">
																							<input type="checkbox" id="emergency" name="emergency" checked={form.emergency} onChange={handleChange} />
																							<label htmlFor="emergency" className="text-sm font-medium text-slate-700">This is an emergency situation requiring immediate attention</label>
																						</div>
																						{form.emergency && (
																							<div className="text-red-600 font-medium mt-2">This is an emergency situation requiring immediate attention</div>
																						)}
																						{/* Location Information Section */}
																						<div className="mt-8">
																							<h3 className="text-xl font-bold flex items-center gap-3 mb-4">
																								<span className="inline-block"><svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="14" cy="14" r="12" /><path d="M14 10v4l3 2" /><circle cx="14" cy="14" r="2" /></svg></span>
																								Location Information
																							</h3>
																							<button 
																								type="button" 
																								onClick={getCurrentLocation}
																								disabled={locationLoading}
																								className="mb-4 px-4 py-2 rounded-lg bg-white border border-blue-200 text-blue-700 font-semibold flex items-center gap-2 shadow hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
																							>
																								{locationLoading ? (
																									<>
																										<div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
																										Getting Location...
																									</>
																								) : (
																									<>
																										<span className="inline-block"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="10" cy="10" r="9" /><path d="M10 6v4l3 2" /></svg></span>
																										Use Current Location
																									</>
																								)}
																							</button>
																							<LocationPicker 
																								value={form.location} 
																								onChange={handleLocationChange}
																								latitude={form.latitude}
																								longitude={form.longitude}
																								onCoordinateChange={handleCoordinateChange}
																							/>
																							<div className="mt-4">
																								<label htmlFor="location_desc" className="block text-sm font-medium text-slate-700 mb-1">Additional Location Details</label>
																								<input 
																									name="location_desc" 
																									id="location_desc" 
																									value={form.location_desc || ""} 
																									onChange={handleChange} 
																									className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
																									placeholder="Describe landmarks, specific area details, etc." 
																								/>
																							</div>

																							{/* Photos & Videos Section */}
																							<div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
																								<div className="flex items-center mb-6">
																									<Image className="w-6 h-6 text-slate-600 mr-2" />
																									<h2 className="text-xl font-bold">Photos & Videos</h2>
																								</div>
																								
																								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
																									{/* Upload Media */}
																									<div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
																										<Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
																										<h3 className="text-lg font-semibold mb-2">Upload Media</h3>
																										<p className="text-slate-500 mb-4">Select photos or videos from your device</p>
																										<button 
																											type="button"
																											className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
																											onClick={() => document.getElementById('file-upload').click()}
																										>
																											<Image className="w-4 h-4 mr-2" />
																											Choose Files
																										</button>
																										<input
																											id="file-upload"
																											type="file"
																											multiple
																											accept="image/*,video/*"
																											className="hidden"
																											onChange={(e) => {
																												const files = Array.from(e.target.files);
																												setForm(prev => ({ ...prev, media: [...prev.media, ...files] }));
																											}}
																										/>
																									</div>

																									{/* Take Photo/Video */}
																									<div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
																										<Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
																										<h3 className="text-lg font-semibold mb-2">Take Photo/Video</h3>
																										<p className="text-slate-500 mb-4">Use your device camera to capture</p>
																										
																										{/* Camera options */}
																										<div className="flex flex-col sm:flex-row gap-2 justify-center">
																											<button 
																												type="button"
																												className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
																												onClick={() => handleAdvancedCamera('photo')}
																											>
																												<Camera className="w-4 h-4 mr-2" />
																												Take Photo
																											</button>
																											<button 
																												type="button"
																												className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
																												onClick={() => handleAdvancedCamera('video')}
																											>
																												<Camera className="w-4 h-4 mr-2" />
																												Record Video
																											</button>
																										</div>
																									</div>
																								</div>

																								{/* Display uploaded files */}
																								{form.media && form.media.length > 0 && (
																									<div className="mt-6">
																										<h4 className="font-medium text-slate-700 mb-3">Uploaded Files ({form.media.length})</h4>
																										<div className="flex flex-wrap gap-2">
																											{form.media.map((file, idx) => (
																												<div key={idx} className="flex items-center bg-slate-100 rounded-lg px-3 py-2 text-sm">
																													<Image className="w-4 h-4 mr-2 text-slate-500" />
																													<span className="text-slate-700">{file.name}</span>
																													<button
																														type="button"
																														className="ml-2 text-red-500 hover:text-red-700"
																														onClick={() => {
																															const newMedia = form.media.filter((_, index) => index !== idx);
																															setForm(prev => ({ ...prev, media: newMedia }));
																														}}
																													>
																														×
																													</button>
																												</div>
																											))}
																										</div>
																									</div>
																								)}

																								{/* Media Guidelines */}
																								<div className="mt-6 bg-blue-50 rounded-lg p-4">
																									<h4 className="font-semibold text-blue-800 mb-2">Media Guidelines</h4>
																									<ul className="text-blue-700 text-sm space-y-1">
																										<li>• Maximum file size: 25MB per file</li>
																										<li>• Supported formats: JPEG, PNG, MP4, MOV</li>
																										<li>• Clear, well lit photos help with verification</li>
																										<li>• Include landmarks or reference points when possible</li>
																									</ul>
																								</div>
																							</div>

																							{/* Additional Information Section */}
																															<div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
																																<h2 className="text-xl font-bold mb-6">Additional Information</h2>
																																<div className="mb-4">
																																	<label htmlFor="affected_population" className="block text-sm font-medium text-slate-700 mb-1">Estimated Affected Population</label>
																																	<input name="affected_population" id="affected_population" value={form.affected_population || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" type="number" min="0" placeholder="0" />
																																</div>
																																<div>
																																	<label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1">Contact Information (Optional)</label>
																																	<input name="contact" id="contact" value={form.contact} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="Phone number or email for follow-up" />
																																</div>
																															</div>
																						</div>
																		{/* Date/Time Picker */}
																		<div>
																			<label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Date & Time Observed</label>
																			<input name="date" id="date" type="datetime-local" value={form.date} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
																		</div>
																		{/* Contact Info */}
																		<div>
																			<label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1">Contact Info (optional)</label>
																			<input name="contact" id="contact" value={form.contact} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="Your email or phone (for follow-up)" />
																		</div>
																		<div>
																			<button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg px-4 py-2" disabled={loading}>{loading ? "Submitting..." : "Submit Report"}</button>
																		</div>
													</form>
												)}
								</div>
							</div>
						</div>
					);
}
