import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {style} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {StyledBox, Text} from "../../utils/BaseModal.styled";
import {Button} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";


export interface BaseModalWindowType {
  openModal: boolean;
  closeModal: () => void;
  style_close: string;
  color_off: "inherit" | "disabled" | "action" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  style_title: string;
  title: string;
  text: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement> | any) => void;
  style_done: any;
}

const BaseModalWindow: React.FC<BaseModalWindowType> = ({
                                                          openModal, closeModal,
                                                          style_close, color_off,
                                                          style_title, title, text,
                                                          onSubmit, style_done
                                                        }) => {
  return (
    <>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={style_close}>
            <HighlightOffIcon onClick={closeModal} color={color_off}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={style_title}>{title}</Text>
            <Text>{text}</Text>
          </Typography>
          <StyledBox
            component="form"
            onSubmit={onSubmit}
          >
            <Button type="submit">
              <DoneIcon sx={style_done}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>
    </>
  );
};

export default BaseModalWindow;
