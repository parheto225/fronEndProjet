import { MapContainer, TileLayer } from "react-leaflet"; //Marker, Popup,
import "leaflet/dist/leaflet.css";
import GeotiffLayer from "../../GeotiffLayer";

const MapWithTiff = () => {
    // const tiffUrl = "../../data/OCS/ocs.tif";
    // const center = [7.5468545, -5.547099500000002];
    // const zoom = 3;

    const tiffUrl = "https://georaster-layer-for-leaflet.s3.amazonaws.com/wind_direction.tif";
  //"https://georaster-layer-for-leaflet.s3.amazonaws.com/GHS_POP_E2015_GLOBE_R2019A_4326_9ss_V1_0.tif";
  //"https://idmt.s3.ap-south-1.amazonaws.com/uat/data_sources/erpas/rain_ind_20210708_20210808.tif";
  const center = [7.5468545, -5.547099500000002];
  const zoom = 3;

  const options = {
    pixelValuesToColorFn: (values) => {
      // transforming single value into an rgba color
      const nir = values[0];
      console.log("values:", nir);
      if (nir === 0) return;
      //console.log("nir:", nir);
      const r = (nir / 20000) * 255;
      const g = 0;
      const b = 0;
      return `rgba(${r},${g},${b}, 1)`;
    },

    customDrawFunction: ({ context, x, y, width, height, values }) => {
      // from https://github.com/stuartmatthews/leaflet-geotiff/blob/master/leaflet-geotiff-vector-arrows.js
      var value = values[0];
      var arrowSize = width / 2.5;
      context.save();
      context.translate(x, y);
      context.rotate(((90 + value) * Math.PI) / 180);
      context.beginPath();
      context.moveTo(-arrowSize / 2, 0);
      context.lineTo(+arrowSize / 2, 0);
      context.moveTo(arrowSize * 0.25, -arrowSize * 0.25);
      context.lineTo(+arrowSize / 2, 0);
      context.lineTo(arrowSize * 0.25, arrowSize * 0.25);
      context.stroke();
      context.restore();
    },
    resolution: 64,
    opacity: 1
  };

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeotiffLayer url={tiffUrl} options={options} />
    </MapContainer>
  );
};

export default MapWithTiff;


// // import React, { useEffect } from 'react';
// // import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import georaster from 'georaster';
// // import GeoRasterLayer from 'georaster-layer-for-leaflet';
// // // import tiffUrl from "../../data/OCS/ocs.tiff"

// // // import Tiff_Map from '../../data/OCS/ocs.tif';

// // const tiffMap = "../../data/OCS/ocs.tif"

// // const MapWithTiff = ({ tiffUrl }) => {
// //   useEffect(() => {
// //     const loadTiff = async () => {
// //       // Charger le fichier TIFF
// //       const tiffUrl = {tiffMap}
// //       const response = await fetch(tiffUrl);
// //       const arrayBuffer = await response.arrayBuffer();
// //       const raster = await georaster(arrayBuffer);

// //       const Legend = () => (
// //         <div className="legend">
// //           <h4>Legend</h4>
// //           <div><span style={{ background: '#FF0000' }}></span> 0 - 50</div>
// //           <div><span style={{ background: '#FFA500' }}></span> 51 - 100</div>
// //           <div><span style={{ background: '#00FF00' }}></span> 101+</div>
// //         </div>
// //       );
      
      
      

// //       // Ajouter la couche GeoRasterLayer
// //       const geoRasterLayer = new GeoRasterLayer({
// //         georaster: raster,
// //         // opacity: 0.7,  // ajustable selon les besoins
// //         // pixelValuesToColorFn: (value) => {
// //         //   if (value < 50) return '#FF0000';
// //         //   if (value < 100) return '#FFA500';
// //         //   return '#00FF00'; // autre couleur pour les valeurs supérieures
// //         // }
// //       });

// //       // Ajouter la couche à la carte Leaflet
// //     //   const map = L.map('map');
// //       const map = useMap()
// //       geoRasterLayer.addTo(map);
// //     };

// //     loadTiff();
// //   }, [tiffUrl]);

// //   return (
// //     <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
// //       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

// //       <legend />
// //     </MapContainer>
// //   );
// // };

// // export default MapWithTiff;
