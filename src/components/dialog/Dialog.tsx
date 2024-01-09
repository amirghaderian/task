import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import { LittleMap } from "..";
import { Box, Checkbox, Divider, List, ListItem } from "@mui/material";
import Iran from "../../images/iranFlag.png";
import data from "../../services/servers.json";
import Echart from "../chart/Chart";
import { useState } from "react";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Dialogs = ({
  isOpen,
  handleClose,
  fId,
  center,
  onIdNumberChange,
  centerId,
  timeSeries,
  littleMapId,
  setLittleMapId,
}) => {
  console.log(timeSeries);
  const [points, setPoints] = useState([]);

  const removePointById = (id) => {
    const filterd = points.filter((point) => point.id !== id);
    setPoints(filterd);
  };
  console.log(points), "points";
  const y = 0.01324773;
  const x = 2.16 * y;
  const findCenter = data.find((item) => item.id === centerId);
  console.log(findCenter, "center");
  const FindLatiude = data.find((item) => item.id === centerId)?.location
    .latitude;
  const FindeLongitude = data.find((item) => item.id === centerId)?.location
    .longitude;
  const nearPoints = data.filter(
    (item) =>
      // find latitude betveen FindLatiude-y & FindLatiude+y
      Math.abs(FindLatiude - item.location.latitude) <= y &&
      Math.abs(FindeLongitude - item.location.longitude) <= x
  );

  const handleIdNumberChange = (newIdNumber) => {
    console.log("Id Number changed:", newIdNumber);
    setLittleMapId(newIdNumber);
    ////////////////////////////////////////
    // onIdNumberChange(newIdNumber);
    // اینجا می‌توانید مقدار جدید را به state یا هر کار دیگری انجام دهید.
  };
  const style = {
    p: 0,
    width: "100%",
    maxWidth: 282,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    borderStyle: "dashed",
  };
  return (
    <div className="min-w-[1000px]">
      <BootstrapDialog
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        sx={{ width: "100%", height: "100%" }}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ bgcolor: "rgb(0,101,162)" }}
        >
          Time Series
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LittleMap
            style={{ flexGrow: 1 }}
            removePointById={removePointById}
            center={center}
            onIdNumberChange={handleIdNumberChange}
            centerId={centerId}
            setPoints={setPoints}
            pointList={points}
          />
          <Echart
            style={{ flexGrow: 8 }}
            timeSeries={timeSeries}
            fId={fId}
            onIdNumberChange={onIdNumberChange}
            littleMapId={littleMapId}
            setPoints={setPoints}
            points={points}
          />
        </Box>
        <Box>
          <Box>
            {nearPoints.map((item) => {
              return (
                <List sx={style} aria-label="mailbox folders" key={item.id}>
                  <ListItem sx={{ height: 41 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        maxHeight: 41,
                      }}
                    >
                      <Checkbox
                        disableRipple
                        icon={
                          <RadioButtonUnchecked sx={{ ml: "8px", my: "8px" }} />
                        }
                        checkedIcon={
                          <RadioButtonChecked
                            sx={{ color: "blue", ml: "8px", my: "8px" }}
                          />
                        }
                      />

                      <img
                        style={{
                          width: "32px",
                          height: "24px",
                          marginRight: "10px",
                        }}
                        src={Iran}
                        alt="iran"
                      />
                      {item.title}
                    </div>
                  </ListItem>
                  <Divider
                    component="li"
                    light
                    sx={{ borderStyle: "dashed" }}
                  />
                </List>
              );
            })}
          </Box>
        </Box>

        <DialogContent dividers>
          <Typography gutterBottom></Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
export default Dialogs;
