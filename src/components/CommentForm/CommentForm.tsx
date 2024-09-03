import React, {useState} from 'react';
import {TextField, Button, Box} from '@mui/material';

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправить комментарий на сервер
    console.log('Submitting comment:', comment);
    setComment('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
