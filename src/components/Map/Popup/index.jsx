import { CardHeader, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";
import { PopulationCtx } from "../../../contexts/populationCtx";
import classes from "./DataPopup.module.scss";
import { DEFAULT_ZOOM, GREAT_BRITAIN_POSTION } from "../../../utils/constants";

const DataPopup = () => {
  const popupRef = useRef(null);
  const {
    centerPosition,
    choosenDistrictData,
    setChoosenDistrictData,
    setZoom,
    setCenterPosition,
  } = useContext(PopulationCtx);
  const onClickOnPopupCloseBtn = useCallback(
    (e) => {
      setChoosenDistrictData(null);
      setZoom(DEFAULT_ZOOM);
      setCenterPosition(GREAT_BRITAIN_POSTION);
    },
    [setZoom, setCenterPosition, setChoosenDistrictData]
  );
  useEffect(() => {
    const closeBtn = popupRef.current;
    closeBtn._closeButton.addEventListener("click", onClickOnPopupCloseBtn);
    return () => {
      closeBtn._closeButton.removeEventListener(
        "click",
        onClickOnPopupCloseBtn
      );
    };
  }, [onClickOnPopupCloseBtn]);
  return (
    <Popup position={centerPosition} ref={popupRef}>
      <CardHeader
        classes={{ root: classes.Popup__title }}
        title={choosenDistrictData.districtName}
        component="h2"
      />
      <Typography classes={{ root: classes.Popup__popupdescription }}>
        {choosenDistrictData.description}
      </Typography>
    </Popup>
  );
};

export default DataPopup;
