import React, {useState} from 'react';
import {Modal, Box, TextField, Button, Typography} from '@mui/material';
import {CommentType} from "../../types/commentsTypes.ts";
import CommentForm from "../CommentForm/CommentForm.tsx";

interface ReplyModalProps {
  open: boolean;
  onClose: () => void;
  parentId: number | null;
}

const ReplyModal: React.FC<ReplyModalProps> = ({open, onClose, parentId}) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Dispatch action to submit reply
    console.log('Reply content:', content);
    console.log('Parent ID:', parentId);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography variant="h6">Reply to Comment</Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          label="Your Reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <CommentForm/>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default ReplyModal;
