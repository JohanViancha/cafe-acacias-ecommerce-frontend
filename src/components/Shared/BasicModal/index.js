import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function BasicModal({ children, show, onClose, title, width = 900}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    color: "text.secondary",
    boxShadow: "1",
    borderRadius: 2,
    p: 4,
    
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          fontWeight={"bold"}
          color={"primary.main"}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}

export default BasicModal;
