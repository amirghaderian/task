import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import MyChartComponent from "../chart/Chart";
import { LittleMap } from "..";
import { Box } from "@mui/material";
import Iran from "../../images/iranFlag.png"
import { useState } from "react";
import data from "../../services/servers.json";

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
}) => {
  const [isSee, setSee] = useState(false);
  const nearPointList = ["newYourk", "tehran", "mashhad"];

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
    // onIdNumberChange(newIdNumber);
    // اینجا می‌توانید مقدار جدید را به state یا هر کار دیگری انجام دهید.
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
            center={center}
            onIdNumberChange={handleIdNumberChange}
            centerId={centerId}
          />
          <MyChartComponent fId={fId} onIdNumberChange={onIdNumberChange} />
        </Box>
        <Box>
          <Box sx={{ ml: "15px" }}>
            {nearPoints.map((item) => {
              return (
                <div key={item.id} className="ml-4">
                   <img src={Iran} alt="iran" width={45} height={27} />
                  {item.title}
                 
                </div>
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
