import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import socket from "../../socket/socket";

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      socket.emit('message', {message: comment});
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="outlined"
        placeholder="Write your comment..."
      />
      <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
        Add Comment
      </Button>
    </form>
  );
};

export default CommentForm;
