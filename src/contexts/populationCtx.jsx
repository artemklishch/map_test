import { createContext, useState } from "react";
import { useGetAllDataHook } from "./hooks";
import {
  GREAT_BRITAIN_POSTION,
  DEFAULT_ZOOM,
  CHOOSEN_ONE_LEVEL_ZOOM,
  CHOOSEN_SECOND_LEVEL_ZOOM,
} from "../utils/constants";

const initialState = {
  firstLevelData: null,
  secondLevelData: null,
  firstLevelGeojson: null,
  secondLevelGeojson: null,
  level: 1,
  chooseLevel: () => {},
  zoom: DEFAULT_ZOOM,
  setZoom: () => {},
  centerPosition: GREAT_BRITAIN_POSTION,
  onChooseDistrict: () => {},
  choosenDistrictData: null,
  setChoosenDistrictData: () => {},
  setCenterPosition: () => {},
};
export const PopulationCtx = createContext(initialState);

const PopulationCtxProvider = ({ children }) => {
  const {
    firstLevelData,
    secondLevelData,
    firstLevelGeojson,
    secondLevelGeojson,
  } = useGetAllDataHook();
  const [level, setLevel] = useState(1);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [centerPosition, setCenterPosition] = useState(GREAT_BRITAIN_POSTION);
  const [choosenDistrictData, setChoosenDistrictData] = useState(null);
  const chooseLevel = (value) => {
    setLevel(value);
    setCenterPosition(GREAT_BRITAIN_POSTION);
    setZoom(DEFAULT_ZOOM);
    setChoosenDistrictData(null);
  };
  const onChooseDistrict = (index) => {
    let choosenDistrict;
    if (level === 1) {
      choosenDistrict = firstLevelGeojson.features[index];
    } else {
      choosenDistrict = secondLevelGeojson.features[index];
    }
    const newLat = (choosenDistrict.bbox[1] + choosenDistrict.bbox[3]) / 2;
    const newLon = (choosenDistrict.bbox[0] + choosenDistrict.bbox[2]) / 2;
    setCenterPosition([newLat, newLon]);
    let choosenZoom = CHOOSEN_ONE_LEVEL_ZOOM;
    if (level === 2) {
      choosenZoom = CHOOSEN_SECOND_LEVEL_ZOOM;
    }
    setZoom(choosenZoom);

    const choosenDistrictData = {};
    if (level === 1) {
      choosenDistrictData.districtName =
        firstLevelData.features[index].properties.lvl1_name;
      choosenDistrictData.description = `Population destiny is ${firstLevelData.features[index].properties.Density} people/sq.km1`;
    } else {
      choosenDistrictData.districtName =
        secondLevelData.features[index].properties.lvl2_name;
      choosenDistrictData.description = `Population destiny is ${secondLevelData.features[index].properties.Density} people/sq.km1`;
    }
    setChoosenDistrictData(choosenDistrictData);
  };

  const value = {
    firstLevelData,
    secondLevelData,
    firstLevelGeojson,
    secondLevelGeojson,
    level,
    chooseLevel,
    zoom,
    setZoom,
    centerPosition,
    onChooseDistrict,
    choosenDistrictData,
    setChoosenDistrictData,
    setCenterPosition,
  };
  return (
    <PopulationCtx.Provider value={value}>{children}</PopulationCtx.Provider>
  );
};

export default PopulationCtxProvider;
