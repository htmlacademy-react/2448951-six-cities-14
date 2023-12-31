//vendors
import leaflet from 'leaflet';
import { Map } from 'leaflet';
//react
import {useEffect, useState, useRef} from 'react';
//types
import {Location} from '../types/location';

function useMap(mapRef: React.RefObject<HTMLDivElement>, center: Location) {
  const [map, setMap] = useState<Map | null>(null);
  const renderedRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      if(!renderedRef.current) {
        const instance = leaflet.map(mapRef.current, {
          center: {
            lat: center.latitude,
            lng: center.longitude,
          },
          zoom: center.zoom,
        });

        leaflet
          .tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            },
          )
          .addTo(instance);

        setMap(instance);
        renderedRef.current = instance;
      } else { //карта уже была создана, просто обновляем центр
        const instance = renderedRef.current;
        instance.flyTo([center.latitude, center.longitude], center.zoom);
      }
    }
  }, [mapRef, center]);

  return map;
}

export default useMap;
