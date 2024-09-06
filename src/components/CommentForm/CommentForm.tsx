import React, {useState} from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import {Lightbox} from 'lightbox2';
import Resizer from 'react-image-file-resizer';

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle Comment Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate HTML tags (using a regex to allow only the allowed tags)
    const allowedTags = /<\/?(a|code|i|strong)(\s+href="[^"]*"|\s+title="[^"]*")?\s*>/g;
    if (comment.replace(allowedTags, '') !== comment) {
      setError('Invalid HTML tags found.');
      return;
    }

    // Perform backend submission here (image, textFile, and comment)
    console.log({comment, image, textFile});
  };

  // Handle Image Upload and Resize
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
      Resizer.imageFileResizer(
        file,
        320,
        240,
        'JPEG',
        100,
        0,
        (uri) => {
          setImage(uri as string);
        },
        'base64'
      );
    } else {
      setError('Invalid image format. Only JPG, PNG, and GIF are allowed.');
    }
  };

  // Handle Text File Upload
  const handleTextFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain' && file.size <= 100 * 1024) {
      setTextFile(file);
    } else {
      setError('Invalid text file. Must be a .txt file and under 100KB.');
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
        placeholder="Write your comment (Allowed HTML: <a>, <code>, <i>, <strong>)"
      />

      <Box mt={2}>
        <Typography variant="body1">Upload an Image (JPG, PNG, GIF):</Typography>
        <input type="file" accept="image/*" onChange={handleImageUpload}/>
        {image && (
          <Box mt={2}>
            <img src={image} alt="Preview" width="320" height="240"/>
          </Box>
        )}
      </Box>

      <Box mt={2}>
        <Typography variant="body1">Upload a Text File (TXT, max 100KB):</Typography>
        <input type="file" accept=".txt" onChange={handleTextFileUpload}/>
        {textFile && <Typography variant="body2">{textFile.name}</Typography>}
      </Box>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
        Add Comment
      </Button>
    </form>
  );
};

export default CommentForm;

