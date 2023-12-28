import { useEffect, useRef } from "react";
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
import axios from "axios";
const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const fetchData = async () => {
    await axios
      .get("/api/pointsList")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const mapContainerId = `map-${Math.floor(Math.random() * 1000)}`;

    const mapContainer = document.createElement("div");
    mapContainer.id = mapContainerId;
    mapContainer.style.width = "100%";
    mapContainer.style.height = "400px";

    mapContainerRef.current = mapContainer;

    document.getElementById("map-container").appendChild(mapContainer);

    const map = new Map({
      target: mapContainerId,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Create an array of points
    const points = Array.from({ length: 500 }, (_) => ({
      coordinates: [Math.random() * 360 - 180, Math.random() * 180 - 90],
      color: "blue",
      PID: Math.round(Math.random()),
    }));

    // Create an array of point features
    const pointFeatures = points.map((point) => {
      const geom = new Point(fromLonLat(point.coordinates));
      const feature = new Feature(geom);

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

    // Create a vector layer with the point features
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: pointFeatures,
      }),
    });

    // Add the vector layer to the map
    map.addLayer(vectorLayer);

    // Handle click events on the vector layer
    // Handle click events on the vector layer
    map.on("click", function (event) {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
          return feature;
        }
      );

      if (feature) {
        // Display a dialog or popup with the feature information
        const featureId = feature.ol_uid;
        const featureCoordinates = feature.getGeometry().getCoordinates();
        const featureProperties = feature.getProperties();

        window.alert(
          `Feature ID: ${featureId}\nCoordinates: ${featureCoordinates}\nProperties: ${JSON.stringify(
            featureProperties
          )}`
        );
      }
    });

    return () => {
      map.setTarget(null);
      document
        .getElementById("map-container")
        .removeChild(mapContainerRef.current);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div
      id="map-container"
      style={{ width: "100%", height: "400px" }}
      ref={mapContainerRef}
    ></div>
  );
};

export default MapComponent;
