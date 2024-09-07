import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface ReplyModalProps {
  open: boolean;
  onClose: () => void;
  parentId: number | null;
}

const ReplyModal: React.FC<ReplyModalProps> = ({ open, onClose, parentId }) => {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    // Handle reply submission
    console.log('Submit reply:', replyText, 'for parentId:', parentId);
    // You would dispatch an action or call a function to submit the reply here
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reply to Comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Reply"
          type="text"
          fullWidth
          variant="outlined"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyModal;
