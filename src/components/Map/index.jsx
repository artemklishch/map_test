import classes from "./Map.module.scss";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { districtStyle } from "../../utils/mapHelpers";
import { useContext, useEffect, useState } from "react";
import { PopulationCtx } from "../../contexts/populationCtx";
import { MapEvents, onEachFeature } from "./helpers";
import { DEFAULT_ZOOM } from "../../utils/constants";
import DataPopup from "./Popup";

const Map = () => {
  const {
    firstLevelGeojson,
    secondLevelGeojson,
    level,
    centerPosition,
    choosenDistrictData,
    onChooseDistrict,
  } = useContext(PopulationCtx);
  const [keyAttrValue, setAttrValue] = useState(Math.random().toFixed(10));
  useEffect(() => {
    setAttrValue(Math.random().toFixed(10));
  }, [level]);
  if (!firstLevelGeojson || !secondLevelGeojson) {
    return null;
  }
  const dataToOutput =
    level === 1 ? firstLevelGeojson.features : secondLevelGeojson.features;
  return (
    <MapContainer
      center={centerPosition}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      className={classes.Map}
      maxZoom={14}
      minZoom={1}
      key={choosenDistrictData ? choosenDistrictData.districtName : ""}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={keyAttrValue}
        data={dataToOutput}
        style={districtStyle}
        onEachFeature={(feature, layer) =>
          onEachFeature(feature, layer, onChooseDistrict)
        }
      />
      <MapEvents />
      {choosenDistrictData && <DataPopup />}
    </MapContainer>
  );
};

export default Map;
