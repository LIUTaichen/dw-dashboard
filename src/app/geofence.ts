import { latLng, LatLng, LatLngBounds, map, Map, MapOptions} from 'leaflet';

export class Geofence {
    id: number;
    name: string;
    description: string;
    latlngs: LatLng[] | LatLng[][];
}
