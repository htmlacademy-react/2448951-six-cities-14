//vendors
import {leaflet, Map} from 'leaflet';
import 'leaflet/dist/leaflet.css';
//react
import {useRef, useEffect} from 'react';
//hooks
import useMap from '../../hooks/useMap';
//types
import {MapData} from "../../types/map-data";
//const
import {URL_MARKER_CURRENT} from "../../const";
import {URL_MARKER_DEFAULT} from "../../const";

type PlaceMapProps = {
  mapData: MapData;
  parent: 'cities' | 'offer';
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function PlaceMap({mapData, parent}: PlaceMapProps) {
  const mapRef = useRef(null);
  const map: Map = useMap(mapRef, mapData.center);

  useEffect(() => {
    if (map) {
      //const markerLayer = layerGroup().addTo(map);
      mapData['points'].forEach((point) => {
        console.log('point.id',point.id);
        console.log('mapData?.selectedPoint?.id',mapData?.selectedPoint?.id);
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (point.id === mapData?.selectedPoint?.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, mapData]);


  return (
    <section className={`${parent}__map map`} ref={mapRef}></section>
  );
}

export default PlaceMap;
