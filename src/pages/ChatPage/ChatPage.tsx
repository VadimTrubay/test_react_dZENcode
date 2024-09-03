import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  TablePagination
} from '@mui/material';
import {fetchComments} from "../../redux/comments/operations.ts";
import {socket} from "../../socket/socket.js"
import CommentForm from "../../components/CommentForm/CommentForm.tsx";
import FileUploader from "../../components/FileUploader/FileUploader.tsx";
import CommentTable from "../../components/CommentTable/CommentTable.tsx";


const ChatPage: React.FC = () => {
  const [comments, setComments] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      const comments = await fetchComments();
      setComments(comments);
    };
    loadComments();
  }, [page, rowsPerPage]);

  useEffect(() => {
    socket.on('message', (message: any) => {
      setComments((prevComments: any) => [message, ...prevComments]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('message', {message: newMessage});
      setNewMessage('');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Chat
      </Typography>
      <CommentForm/>
      <FileUploader/>
      <CommentTable comments={comments}/>
      <Box component="form" onSubmit={handleSendMessage} sx={{mt: 2}}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={newMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          variant="outlined"
          placeholder="Type your message..."
        />
        <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
          Send
        </Button>
      </Box>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={comments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default ChatPage;
