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
import data from "../../services/servers.json";
const LittleMap = ({ center, onIdNumberChange, centerId }) => {
  const mapContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [idNumber, setIdNumber] = useState<Number>();
  const y = 0.01324773;
  const x = 2.16 * y;
  console.log(center);
  const FindLatiude = data.find((item) => item.id === centerId)?.location
    .latitude;
  const FindeLongitude = data.find((item) => item.id === centerId)?.location
    .longitude;
  const FilterNear = data.filter(
    (item) =>
      (item.location.latitude >= FindLatiude - y &&
        item.location.latitude <= FindLatiude + y) ||
      (item.location.longitude >= FindeLongitude - x &&
        item.location.longitude <= FindeLongitude + x)
  );
  console.log(FilterNear);
  useEffect(() => {
    const mapContainerId = `map-${Math.floor(Math.random() * 1000)}`;

    const mapContainer = document.createElement("div");
    mapContainer.id = mapContainerId;
    mapContainer.style.width = "100%";
    mapContainer.style.height = "200px";

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
        minZoom: 13,
        maxZoom: 13,
      }),
      interactions: [],
    });

    // Create an array of points
    const points = data.map((server) => ({
      coordinates: [server.location?.longitude, server.location?.latitude],
      color: "#A6A7A6",

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
          fill: new Fill({
            color: centerId === point.id ? "red" : point.color,
          }),
          stroke: new Stroke({ color: "#808080", width: 1 }),
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
        setOpen(true);
        setIdNumber(Number(featureId));
        onIdNumberChange(Number(featureId));
      }
    });

    return () => {
      const mapContainerElement = document.getElementById("littleMap");
      if (mapContainerElement && mapContainerRef.current) {
        map.setTarget(null);
        mapContainerElement.removeChild(mapContainerRef.current);
      }
    };
  }, [idNumber, onIdNumberChange]);

  return (
    <>
      <div
        id="littleMap"
        style={{ width: "100%", height: "100%" }}
        ref={mapContainerRef}
      ></div>
    </>
  );
};

export default LittleMap;
