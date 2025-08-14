// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// // import geoRasterLayer from 'georaster-layer-for-leaflet';
// import { parseGeoraster } from 'georaster';

// import GeoRasterLayer from 'georaster-layer-for-leaflet';
// import { georaster } from 'georaster';

// // import tifUrl from './data/OCS/ocs.tif'

// const MapCarte = () => {
//   useEffect(() => {
//     const loadTif = async () => {
//       const response = await fetch('./data/OCS/ocs.tif'); // Update with your TIF file path
//       const arrayBuffer = await response.arrayBuffer();
//       const georaster = await parseGeoraster(arrayBuffer);

//       const layer = new GeoRasterLayer({
//         georaster: georaster,
//         opacity: 0.7,
//       });

//       layer.addTo(map);
//       map.fitBounds(layer.getBounds());
//     };

//     loadTif();
//   }, []);

//   return (
//     <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }} ref={mapRef => { map = mapRef; }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//     </MapContainer>
//   );
// };

// export default MapCarte;