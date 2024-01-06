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
import { Dialogs } from "..";
const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [FId, setFId] = useState<Number>();
  const [center,setCenter]=useState([])
  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        center: [5720467.70799008, 4262248.0061709145],
        zoom: 12,
      }),
    });

    // Create an array of points
    const points = data.map((server) => ({
      coordinates: [server.location?.longitude, server.location?.latitude],
      color: "blue",
      PID: server.id,
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

    map.addLayer(vectorLayer);

    map.on("click", function (event) {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
          return feature;
        }
      );

      if (feature) {
        // Display a dialog or popup with the feature information

        //open dialog
        const featureId = feature.ol_uid;
        const featureCoordinates = feature.getGeometry().getCoordinates();
        const featureProperties = feature.getProperties();
        setCenter(featureCoordinates)
        // <MyChartComponent/>
        // alert(
        //   `Feature ID: ${featureId}\nCoordinates: ${featureCoordinates}\nProperties: ${JSON.stringify(
        //     featureProperties
        //   )}`
        // );
        console.log(featureProperties);
        console.log(featureCoordinates)

        setOpen(true);
        setFId(featureId)
      }
    });

    
    return () => {
      map.setTarget(null);
      document
        .getElementById("map-container")
        .removeChild(mapContainerRef.current);
    };
  }, []);

  return (
    <>
      <div
        id="map-container"
        style={{ width: "100%", height: "400px" }}
        ref={mapContainerRef}
      ></div>
      <Dialogs
        isOpen={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        fId={FId}
      />
    </>
  );
};

export default MapComponent;
