import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  TablePagination,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip
} from '@mui/material';
import { fetchComments } from "../../redux/comments/operations";
import socket from "../../socket/socket";
import CommentForm from "../../components/CommentForm/CommentForm";
import FileUploader from "../../components/FileUploader/FileUploader";
import { AddComment, Sort } from '@mui/icons-material';
import parse from 'html-react-parser';

const ChatPage: React.FC = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [newMessage, setNewMessage] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const loadComments = async () => {
      fetchComments();
      console.log(comments)
      setComments(comments);
    };
    loadComments();
  }, [page, rowsPerPage, sortField, sortOrder]);

  useEffect(() => {
    socket.on('message', (message) => {
      setComments((prevComments) => [message, ...prevComments]);
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

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('message', { message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Chat
      </Typography>
      <CommentForm />
      <FileUploader />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Sort">
                <IconButton onClick={() => handleSort('user.name')}>
                  User Name <Sort />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Sort">
                <IconButton onClick={() => handleSort('user.email')}>
                  Email <Sort />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Sort">
                <IconButton onClick={() => handleSort('created_at')}>
                  Date <Sort />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>{comment.user.name}</TableCell>
              <TableCell>{comment.user.email}</TableCell>
              <TableCell>{new Date(comment.created_at).toLocaleString()}</TableCell>
              <TableCell>{parse(comment.text)}</TableCell>
              <TableCell>
                <IconButton onClick={() => {/* Добавление ответа на комментарий */}}>
                  <AddComment />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box component="form" onSubmit={handleSendMessage} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={newMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          variant="outlined"
          placeholder="Type your message..."
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
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
