import { FC, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { StopPoint } from '../../../interfaces/stop-point';
import { Trip } from '../../../interfaces/trip';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  shadowUrl: markerShadow,
});

const RouteMapComponent: FC<{ trip: Trip }> = ({ trip }) => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, -98]); // Default to US center
  const [zoom, setZoom] = useState<number>(4);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [stopPoints, setStopPoints] = useState<StopPoint[]>([]);

  useEffect(() => {
    const fetchGeocode = async (location: string): Promise<[number, number] | null> => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
        return null;
      } catch (error) {
        console.error(`Error geocoding ${location}:`, error);
        return null;
      }
    };

    const loadMapData = async () => {
      try {
        const currentPoint = await fetchGeocode(trip.current_location);
        const pickupPoint = await fetchGeocode(trip.pickup_location);
        const dropoffPoint = await fetchGeocode(trip.dropoff_location);
        
        const validPoints = [currentPoint, pickupPoint, dropoffPoint].filter((p): p is [number, number] => p !== null);
        
        if (validPoints.length > 0) {
        
          setMapPosition(validPoints[0]);
          setZoom(8);
          setRoutePoints(validPoints);
          
          const stopMarkers: StopPoint[] = [];
          
          if (trip.stops && trip.stops.length > 0) {
            for (const stop of trip.stops) {
              const point = await fetchGeocode(stop.location);
              if (point) {
                stopMarkers.push({
                  position: point,
                  type: stop.stop_type,
                  location: stop.location,
                  arrival: new Date(stop.arrival_time).toLocaleString(),
                  departure: stop.departure_time ? new Date(stop.departure_time).toLocaleString() : 'N/A'
                });
              }
            }
          }
          
          setStopPoints(stopMarkers);
        }
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    };

    loadMapData();
  }, [trip]);

  const getMarkerColor = (type: string): string => {
    switch (type) {
      case 'start':
        return 'green';
      case 'pickup':
        return 'blue';
      case 'dropoff':
        return 'red';
      case 'rest':
        return 'purple';
      case 'fuel':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const customIcon = (type: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${getMarkerColor(type)}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={mapPosition}
        zoom={zoom}
        style={{ height: '92.3vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {routePoints.length >= 2 && (
          <Polyline
            positions={routePoints}
            color="blue"
            weight={4}
            opacity={0.7}
          />
        )}
        
        {stopPoints.map((stop, index) => (
          <Marker
            key={index}
            position={stop.position}
            icon={customIcon(stop.type)}
          >
            <Popup>
              <div>
                <strong>{stop.type.toUpperCase()}: {stop.location}</strong>
                <p>Arrival: {stop.arrival}</p>
                <p>Departure: {stop.departure}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteMapComponent;
