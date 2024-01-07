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
import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Dialogs = ({ isOpen, handleClose, fId, center, onIdNumberChange,centerId }) => {
  const [isSee, setSee] = useState(false);
  const nearPointList = ["newYourk", "tehran", "mashhad"];
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
          <LittleMap center={center} onIdNumberChange={handleIdNumberChange} centerId={centerId} />
          <MyChartComponent fId={fId} onIdNumberChange={onIdNumberChange} />
        </Box>
        <Box>
          <Box sx={{ width: "" }}>
            {nearPointList.map((nearPoint, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <CheckCircle/>
                  {nearPoint}
                  {<Visibility/>}
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
