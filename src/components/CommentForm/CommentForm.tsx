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
import styles from "./CommentForm.module.css";

const allowedTags = ["a", "code", "i", "strong"];

// HTML tag validation
const validateHTML = (input: string) => {
  const tagPattern = /<\/?([a-z]+)([^>]*)>/gi;
  const openedTags: string[] = [];
  let isValid = true;

  input.replace(tagPattern, (match, tagName) => {
    if (allowedTags.includes(tagName)) {
      if (match[1] === "/") {
        const lastOpened = openedTags.pop();
        if (lastOpened !== tagName) {
          isValid = false; // Tags not closed properly
        }
      } else {
        openedTags.push(tagName);
      }
    } else {
      isValid = false; // Invalid tag found
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

        dispatch(addComment(formData)).then(() => {
          onSuccess();
        });
        formikAddComment.resetForm();
        closeAddCommentModal();
      } else {
        setErrorMessage("Invalid HTML tags or structure.");
      }
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type.includes("image")) {
        // Resize image to 320x240 if necessary
        Resizer.imageFileResizer(
          file,
          320,
          240,
          "JPEG", // Change format as necessary (JPG, GIF, PNG)
          100,
          0,
          (uri) => {
            setSelectedFile(uri as File); // Resized image
          },
          "file"
        );
      } else if (file.type === "text/plain" && file.size <= 102400) {
        // Handle text file
        setSelectedFile(file);
      } else {
        alert(
          "Invalid file type or size. Only JPG, GIF, PNG images under 320x240 pixels or TXT files under 100KB are allowed."
        );
      }
    }
  };

const insertTag = (tag: string) => {
  const textarea = formikAddComment.values.text; // получаем текущее значение поля через formik
  const startPos = textarea.length; // устанавливаем курсор в конец текста
  const endPos = textarea.length;
  const newText =
    textarea.substring(0, startPos) +
    (tag=== "a"? `<${tag}  href="" title="">` : `<${tag}>`) +
    textarea.substring(startPos, endPos) +
    `</${tag}>`;

  formikAddComment.setFieldValue("text", newText); // обновляем значение через formik
};

  return (
    <Modal
      open={openAddCommentModal}
      onClose={closeAddCommentModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{width: 400, bgcolor: "white", p: 4, borderRadius: 2}}>
        <div className={styles.close}>
          <HighlightOffIcon onClick={closeAddCommentModal}/>
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Comment
        </Typography>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            <DoneIcon sx={{fontSize: 50}}/>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentForm;
