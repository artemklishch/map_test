import { useState, useEffect, useCallback } from "react";
import { getLevelData } from "./api";
import populationEndpoints from "./endpoints";

export const useGetAllDataHook = () => {
  const [firstLevelData, setFirstLevelData] = useState(null);
  const [secondLevelData, setSecondLevelData] = useState(null);
  const [firstLevelGeojson, setFirstLevelGeojson] = useState(null);
  const [secondLevelGeojson, setSecondLevelGeojson] = useState(null);
  const getLevelOneData = async () => {
    const firstLevelData = await getLevelData(
      populationEndpoints.firstLevelDataFetch
    );
    setFirstLevelData(firstLevelData);
  };
  const getLevelSecondData = async () => {
    const seconfLevelData = await getLevelData(
      populationEndpoints.secondLevelDataFetch
    );
    setSecondLevelData(seconfLevelData);
  };
  const getLevelOneGeojson = useCallback(async () => {
    const firstLevelGeojson = await getLevelData(
      populationEndpoints.firstLevelGeoJsonFetch
    );
    for (let i = 0; i <= firstLevelData.features.length - 1; i++) {
      firstLevelGeojson.features[i].density =
        firstLevelData.features[i].properties.Density;
      firstLevelGeojson.features[i].index = i;
    }
    setFirstLevelGeojson(firstLevelGeojson);
  }, [firstLevelData]);
  const getLevelSecondGeojson = useCallback(async () => {
    const secondLevelGeojson = await getLevelData(
      populationEndpoints.secondLevelGeoJsonFetch
    );
    for (let i = 0; i <= secondLevelData.features.length - 1; i++) {
      secondLevelGeojson.features[i].density =
        secondLevelData.features[i].properties.Density;
      secondLevelGeojson.features[i].index = i;
    }
    setSecondLevelGeojson(secondLevelGeojson);
  }, [secondLevelData]);
  useEffect(() => {
    getLevelOneData();
    getLevelSecondData();
  }, []);
  useEffect(() => {
    if (firstLevelData) {
      getLevelOneGeojson();
    }
  }, [firstLevelData, getLevelOneGeojson]);
  useEffect(() => {
    if (secondLevelData) {
      getLevelSecondGeojson();
    }
  }, [secondLevelData, getLevelSecondGeojson]);
  return {
    firstLevelData,
    secondLevelData,
    firstLevelGeojson,
    secondLevelGeojson,
  };
};
