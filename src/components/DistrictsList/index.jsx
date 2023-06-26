import { List, ListItemButton, ListItemText } from "@mui/material";
import { useContext } from "react";
import { PopulationCtx } from "../../contexts/populationCtx";
import classes from "./DistrictsList.module.scss";

const DistrictsList = () => {
  const { level, firstLevelData, secondLevelData, onChooseDistrict } =
    useContext(PopulationCtx);
  if (!firstLevelData || !secondLevelData) {
    return null;
  }
  const districtsToRender =
    level === 1 ? firstLevelData.features : secondLevelData.features;
  const districtPropName = level === 1 ? "lvl1_name" : "lvl2_name";
  return (
    <List>
      {districtsToRender.map((district, index) => (
        <ListItemButton
          key={index}
          classes={{ root: classes.itemButton }}
          onClick={() => onChooseDistrict(index)}
        >
          <ListItemText primary={district.properties[districtPropName]} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default DistrictsList;
