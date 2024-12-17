"use client";
import { useState, useEffect } from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import { Input } from "@components/ui/input";
// import L from "leaflet";

export default function Map({ form }: { form: any }) {
	const [position, setPosition] = useState<[number, number] | null>(null);
	const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
		null
	);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setPosition([latitude, longitude]);
					setMarkerPosition([latitude, longitude]);
					form.setValue("latitude", latitude);
					form.setValue("longitude", longitude);
				},
				(error) => {
					console.error("Error getting location:", error);
				}
			);
		}
	}, [form]);

	const LocationMarker = () => {
		const map = useMapEvents({
			click() {
				map.locate();
			},
			locationfound(e) {
				setMarkerPosition([e.latlng.lat, e.latlng.lng]);
				map.flyTo(e.latlng, map.getZoom());
				form.setValue("latitude", e.latlng.lat);
				form.setValue("longitude", e.latlng.lng);
			},
		});

		return markerPosition === null ? null : (
			<>
				<FormField
					control={form.control}
					name='latitude'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type='hidden' {...field} value={markerPosition[0]} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='longitude'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type='hidden' {...field} value={markerPosition[1]} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Marker
					draggable={true}
					position={markerPosition}
					eventHandlers={{
						dragend: (e) => {
							const marker = e.target;
							const newPosition = marker.getLatLng();
							setMarkerPosition([newPosition.lat, newPosition.lng]);
							form.setValue("latitude", newPosition.lat);
							form.setValue("longitude", newPosition.lng);
						},
					}}
				>
					<Popup>
						Your coordinates are:
						<p>
							Latitude: {markerPosition[0]}, Longitude:
							{markerPosition[1]}
						</p>
					</Popup>
				</Marker>
			</>
		);
	};

	return position === null ? (
		<p>Loading...</p>
	) : (
		<MapContainer
			center={position}
			zoom={13}
			scrollWheelZoom={false}
			className='z-0'
		>
			<TileLayer
				// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<LocationMarker />
		</MapContainer>
	);
}
