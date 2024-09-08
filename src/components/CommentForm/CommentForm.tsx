import React, {useState, ChangeEvent} from "react";
import {TextField, Button, Box, Typography, Modal} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import Resizer from "react-image-file-resizer";
import {addComment} from "../../redux/comments/operations";
import {initialValues} from "../../initialValues/initialValues";
import {validationSchemaAddComment} from "../../validate/validationSchemaAddComment";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./CommentForm.module.css";

const allowedTags = ["a", "code", "i", "strong"];

const validateHTML = (input: string) => {
  const tagPattern = /<\/?([a-z]+)([^>]*)>/gi;
  const openedTags: string[] = [];
  let isValid = true;

  input.replace(tagPattern, (match, tagName) => {
    if (allowedTags.includes(tagName)) {
      if (match[1] === "/") {
        const lastOpened = openedTags.pop();
        if (lastOpened !== tagName) {
          isValid = false;
        }
      } else {
        openedTags.push(tagName);
      }
    } else {
      isValid = false;
    }
  });

  return isValid && openedTags.length === 0;
};

interface CommentFormProps {
  openAddCommentModal: boolean;
  closeAddCommentModal: () => void;
  onSuccess: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
                                                   openAddCommentModal,
                                                   closeAddCommentModal,
                                                   onSuccess,
                                                 }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const formikAddComment = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaAddComment,
    onSubmit: (values) => {
      if (validateHTML(values.text)) {
        const formData = new FormData();
        formData.append("text", values.text);
        if (selectedFile) {
          formData.append("file", selectedFile);
        }
        formData.append('captcha', captchaValue);

        dispatch(addComment(formData)).then(() => {
          onSuccess();
        });
        formikAddComment.resetForm();
        closeAddCommentModal();
        setCaptchaValue(null);
      } else {
        setErrorMessage("Invalid HTML tags or structure.");
      }
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type.includes("image")) {
        Resizer.imageFileResizer(
          file,
          320,
          240,
          "JPEG",
          100,
          0,
          (uri) => {
            setSelectedFile(uri as File);
          },
          "file"
        );
      } else if (file.type === "text/plain" && file.size <= 102400) {
        setSelectedFile(file);
      } else {
        alert(
          "Invalid file type or size. Only JPG, GIF, PNG images under 320x240 pixels or TXT files under 100KB are allowed."
        );
      }
    }
  };

  const insertTag = (tag: string) => {
    const textarea = formikAddComment.values.text;
    const startPos = textarea.length;
    const endPos = textarea.length;
    const newText =
      textarea.substring(0, startPos) +
      (tag === "a" ? `<${tag}  href="" title="">` : `<${tag}>`) +
      textarea.substring(startPos, endPos) +
      `</${tag}>`;

    formikAddComment.setFieldValue("text", newText);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <Modal
      open={openAddCommentModal}
      onClose={closeAddCommentModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onBackdropClick={closeAddCommentModal}
    >
      <Box
        className={styles.backdrop}
      >
        <Box className={styles.modalContent}>
          <div className={styles.close}>
            <HighlightOffIcon onClick={closeAddCommentModal}/>
          </div>
          <div id="modal-modal-title" variant="h6" component="h2" className={styles.title_add_comment}>
            Add Comment
          </div>
          <Box component="form" onSubmit={formikAddComment.handleSubmit}>
            <Typography variant="h6">Text:</Typography>
            <TextField
              id="text"
              name="text"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={formikAddComment.values.text}
              onChange={formikAddComment.handleChange}
              onBlur={formikAddComment.handleBlur}
              error={
                formikAddComment.touched.text &&
                Boolean(formikAddComment.errors.text)
              }
              helperText={
                formikAddComment.touched.text && formikAddComment.errors.text
              }
            />
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
            <Box mt={2}>
              <input
                accept=".jpg,.png,.gif,.txt"
                type="file"
                onChange={handleFileChange}
              />
            </Box>
            <Box mt={2}>
              <Button onClick={() => insertTag("i")}>[i]</Button>
              <Button onClick={() => insertTag("strong")}>[strong]</Button>
              <Button onClick={() => insertTag("code")}>[code]</Button>
              <Button onClick={() => insertTag("a")}>[a]</Button>
            </Box>
            <Box mt={2}>
              <ReCAPTCHA
                sitekey="6Lc3PTkqAAAAACVd2nviu2ncH7RU9V-XR_KnsRyh"
                onChange={handleCaptchaChange}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={captchaValue === null}
            >
              <DoneIcon sx={{fontSize: 50}}/>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentForm;
