import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Fill, Stroke, Circle } from "ol/style";
import "../../services/server";
import data from "../../services/servers.json";
import { getUid } from "ol/util";
import { Dialogs, MyChartComponent } from "..";
const LittleMap = ({ center, onMapClick }) => {
  const mapContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [FId, setFId] = useState<Number>();
  const [centerMap, setCenterMap] = useState([]);
  const [initCenter, setInitCenter] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleMapClick = (clickedData) => {
    console.log(clickedData);
    
  };
  useEffect(() => {
    const mapContainerId = `map-${Math.floor(Math.random() * 1000)}`;

    const mapContainer = document.createElement("div");
    mapContainer.id = mapContainerId;
    mapContainer.style.width = "100%";
    mapContainer.style.height = "400px";

    mapContainerRef.current = mapContainer;

    document.getElementById("littleMap").appendChild(mapContainer);
    const map = new Map({
      target: mapContainerId,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: center,
        zoom: 13,
      }),
    });

    // Create an array of points
    const points = data.map((server) => ({
      coordinates: [server.location?.longitude, server.location?.latitude],
      color: "blue",
      id: server.id,
    }));

    // Create an array of point features
    const pointFeatures = points.map((point) => {
      const geom = new Point(fromLonLat(point.coordinates));
      const feature = new Feature(geom);

      feature.ol_uid = point.id;
      
      // Style for the point
      const pointStyle = new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: point.color }),
          stroke: new Stroke({ color: "white", width: 1 }),
        }),
      });

      feature.setStyle(pointStyle);

      return feature;
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: pointFeatures,
      }),
    });

    map.addLayer(vectorLayer);
    map.on("click", function (event) {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
          return feature;
        }
      );

      if (feature) {

        const featureId = feature.ol_uid;
        const featureCoordinates = feature.getGeometry().getCoordinates();
        const featureProperties = feature.getProperties();
        setInitCenter(featureCoordinates);
        setOpen(true);
        setCenterMap(featureCoordinates);
        console.log(featureId);
        handleMapClick(Number(featureId));
        setFId(Number(featureId));
      }
    });

    return () => {
      const mapContainerElement = document.getElementById("littleMap");
      if (mapContainerElement && mapContainerRef.current) {
        map.setTarget(null);
        mapContainerElement.removeChild(mapContainerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        id="littleMap"
        style={{ width: "100%", height: "400px" }}
        ref={mapContainerRef}
      ></div>
    </>
  );
};

export default LittleMap;
