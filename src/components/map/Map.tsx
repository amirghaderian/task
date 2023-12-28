import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapContainerId = `map-${Math.floor(Math.random() * 1000)}`;

    const mapContainer = document.createElement("div");
    mapContainer.id = mapContainerId;
    mapContainer.style.width = "100%";
    mapContainer.style.height = "400px";

    // Attach the map container to the useRef
    mapContainerRef.current = mapContainer;

    // Append the map container to the component
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

    // Cleanup function to remove the map container when the component is unmounted
    return () => {
      map.setTarget(null);
      // Use mapContainerRef.current to access the DOM element
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
