import { useContext, useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import { PopulationCtx } from "../../contexts/populationCtx";

export const MapEvents = () => {
  const { setZoom, zoom, centerPosition } = useContext(PopulationCtx);
  const map = useMapEvents({
    zoom(e) {
      setZoom(e.target._zoom);
    },
  });
  useEffect(() => {
    map.setZoom(zoom);
    map.setView(centerPosition, zoom);
  }, [zoom, map, centerPosition]);
  return null;
};

export const onEachFeature = (feature, layer, onChooseDistrict) => {
  const lat = (feature.bbox[1] + feature.bbox[3]) / 2;
  const lan = (feature.bbox[0] + feature.bbox[2]) / 2;
  const popupContent = feature.properties.engtype_1
    ? `${feature.properties.engtype_1} ${feature.properties.name_1}`
    : `${feature.properties.name_2}, ${feature.properties.name_1}`;
  layer.on("mouseover", function (e) {
    layer
      .bindTooltip(popupContent, { direction: "bottom" })
      .openTooltip([lat, lan]);
  });
  layer.on("mouseout", function (e) {
    layer.unbindTooltip();
  });
  layer.on("click", function (e) {
    layer.unbindTooltip();
    onChooseDistrict(feature.index);
  });
  return null;
};
