import { useContext, useState } from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import classes from "./LevelsList.module.scss";
import { PopulationCtx } from "../../contexts/populationCtx";

const LevelsList = () => {
  const { chooseLevel } = useContext(PopulationCtx);
  const [isLevelsListOpen, setIsLevelsListOpen] = useState(false);
  const openLevelBtnList = () => setIsLevelsListOpen(!isLevelsListOpen);
  return (
    <List classes={{ root: classes.LevelsList }}>
      <ListItemButton
        onClick={openLevelBtnList}
        classes={{ root: classes.itemButton }}
      >
        <ListItemText primary="Select" classes={{ root: classes.buttonTxt }} />
        {isLevelsListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={isLevelsListOpen}
        timeout="auto"
        unmountOnExit
        classes={{ root: classes.collapseBlock }}
      >
        <List component="div">
          <ListItemButton
            classes={{ root: classes.collapseBlock__itemDropDownBtn }}
            onClick={() => chooseLevel(1)}
          >
            <ListItemText
              primary="Level 1"
              classes={{
                root: classes.collapseBlock__itemDropDownBtn_btnText,
              }}
            />
          </ListItemButton>
          <ListItemButton
            classes={{ root: classes.collapseBlock__itemDropDownBtn }}
            onClick={() => chooseLevel(2)}
          >
            <ListItemText
              primary="Level 2"
              classes={{
                root: classes.collapseBlock__itemDropDownBtn_btnText,
              }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default LevelsList;
