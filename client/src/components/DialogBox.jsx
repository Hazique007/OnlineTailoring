import React, { useState } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog className="bg-white" onClose={handleClose} open={open}>
      <DialogTitle className="font-[700] font-poppins text-[12px] ">
        Would you like to proceed with Fabric Selection?
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <p className="text-[12px] font-[400] font-poppins">
          Click ‘yes’ if you want to buy the cloth as well. Click ‘no’ if you
          already have the fabric which we’ll pick up during measurements.
        </p>
        <button className="px-4 py-2 text-[12px] text-white bg-[#C65647] font-[400] font-poppins">
          ‘Yes’ I want to purchase the fabric
        </button>
        <button className="px-4 py-2 text-[12px] text-[#1043F9] font-[400] font-poppins">
          ‘No’, I already have the fabric{" "}
        </button>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
