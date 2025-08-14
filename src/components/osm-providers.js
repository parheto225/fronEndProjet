let mapLink= '<a href="http://www.esri.com/">Esri</a>';
let wholink= 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

export default {
    maptiler: {
        attribution: '@Copyright - AGROMAP-CI - AKIDOMPRO',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    googleMap: {
        minZoom: 7,
        maxZoom: 25,
        attribution: '&copy; '+mapLink+', '+ wholink,
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    },
    googleMapStreet: {
        minZoom: 7,
        maxZoom: 25,
        attribution: '&copy; '+mapLink+', '+ wholink,
        url: 'http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',
        subdomains: ['mt0','mt1','mt2','mt3']
    },
    climatMap: {
        attribution: '@Copyright - AGROMAP-CI - AKIDOMPRO',
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        minZoom: 7,
        maxZoom: 25,
    },
    osm: {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        minZoom: 7,
        maxZoom: 25,
    },
    cartodb : {
        minZoom: 7,
        maxZoom: 25,
        url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    },
    toner: {
        minZoom: 7,
        maxZoom: 25,
        url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    },
    white: {
        minZoom: 7,
        maxZoom: 25,
        url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
    
}