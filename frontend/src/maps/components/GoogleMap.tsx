import React, { useState, useEffect, useRef } from 'react';
import { Map, useMap } from '@vis.gl/react-google-maps';
import { GoogleMapProps } from '../types/mapTypes';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, googleMapsService } from '../services/googleMapsService';
import { CustomMarker } from './CustomMarker';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';

// Polyline component using Google Maps JS SDK
const PolylineOverlay: React.FC<{
  path: { lat: number; lng: number }[];
  color?: string;
  weight?: number;
  opacity?: number;
}> = ({ path, color = '#6366f1', weight = 4, opacity = 0.8 }) => {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: opacity,
      strokeWeight: weight,
      map,
    });

    polylineRef.current = polyline;

    return () => {
      polyline.setMap(null);
    };
  }, [map, path, color, weight, opacity]);

  return null;
};

export const GoogleMap: React.FC<GoogleMapProps> = ({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
  theme = 'dark',
  markers = [],
  polylines = [],
  selectedMarkerId,
  onMarkerSelect,
  controls,
  className = 'w-full h-[450px]',
  style,
  children,
  gestureHandling = 'cooperative',
  disableDefaultUI = true,
}) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const mapStyles = googleMapsService.getMapStyle(currentTheme);

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-lg border border-slate-800 ${className}`} style={{ ...style, height: style?.height || '100%' }}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        mapId="OFF_GO_GOOGLE_MAP_FOUNDATION"
        styles={mapStyles}
        gestureHandling={gestureHandling}
        disableDefaultUI={disableDefaultUI}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Render Custom Markers */}
        {markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            marker={marker}
            isSelected={selectedMarkerId === marker.id}
            onSelect={onMarkerSelect}
          />
        ))}

        {/* Render Polyline Overlays */}
        {polylines.map((poly) => (
          <PolylineOverlay
            key={poly.id}
            path={poly.path}
            color={poly.color}
            weight={poly.weight}
            opacity={poly.opacity}
          />
        ))}

        {children}
      </Map>

      {/* Interactive Map Controls Overlay */}
      <MapControls
        config={controls}
        themeMode={currentTheme}
        onToggleTheme={() =>
          setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }
        defaultCenter={center}
      />

      {/* Telematics Legend Overlay */}
      <MapLegend />
    </div>
  );
};
