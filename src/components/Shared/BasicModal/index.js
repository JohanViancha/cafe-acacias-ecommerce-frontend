import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function BasicModal({ children, show, onClose, title, width = 900 }) {
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

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    onClose();
  };

  return (
    <Modal open={show} onClose={handleClose} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack place flexDirection={"column-reverse"}>
          <Typography
            id="modal-modal-title"
            fontWeight={"bold"}
            color={"primary.main"}
            my={2}
          >
            {title}
          </Typography>
          <IconButton
            sx={{ placeSelf: "end", cursor: "pointer" }}
            aria-label=""
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        {children}
      </Box>
    </Modal>
  );
}

export default BasicModal;
