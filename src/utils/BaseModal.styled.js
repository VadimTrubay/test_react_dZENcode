import {styled} from "styled-components";
import Box from "@mui/material/Box";

export const Text = styled.p`
  text-align: center;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid var(--brand-color)",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export const styleQuizModal = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid var(--brand-color)",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  overflowY: "auto",
};