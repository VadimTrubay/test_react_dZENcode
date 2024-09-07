// CommentByIdPage.tsx
import React, {useState, useEffect, ChangeEvent} from 'react';
import {
  Typography,
  TablePagination,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  TableContainer, Paper
} from '@mui/material';
import {fetchCommentById} from "../../redux/comments/operations";
import {AddComment, Sort} from '@mui/icons-material';
import parse from 'html-react-parser';
import {CommentType} from "../../types/commentsTypes.ts";
import {AppDispatch} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectAllComments, selectCommentById, selectCountComments} from "../../redux/comments/selectors";
import {useParams} from "react-router-dom";
import {number} from "yup";

const CommentByIdPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams<{ id: string }>();
  const commentById = useSelector<CommentType[] | null>(selectCommentById);
  const totalComments = useSelector<any>(selectCountComments);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortField, setSortField] = useState('created_at');


  useEffect(() => {
    if (id) {
      dispatch(fetchCommentById(Number(id)));
    }
  }, [page, rowsPerPage, sortField, sortOrder, dispatch]);

  useEffect(() => {
    setComments(commentById);
  }, [comments]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const toggleExpand = (commentId: number) => {
    setExpandedComments(prevState =>
      prevState.includes(commentId)
        ? prevState.filter(id => id !== commentId)
        : [...prevState, commentId]
    );
  };

  const renderReplies = (replies: CommentType[], level: number = 0) => {
    return replies.map(reply => (
      <React.Fragment key={reply.id}>
        <TableRow>
          <TableCell style={{paddingLeft: `${level * 20}px`}}>
            {reply.user.username}
          </TableCell>
          <TableCell>{reply.user.email}</TableCell>
          <TableCell>{new Date(reply.created_at || '').toLocaleString()}</TableCell>
          <TableCell>{parse(reply.text)}</TableCell>
          <TableCell>
            <IconButton onClick={() => {/* Handle reply to comment */
            }}>
              <AddComment/>
            </IconButton>
          </TableCell>
        </TableRow>
        {expandedComments?.includes(reply.id) && renderReplies(reply.replies, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" gutterBottom>
        Comment Page
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Sort">
                <IconButton onClick={() => handleSort('user__username')}>
                  User Name <Sort/>
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Sort">
                <IconButton onClick={() => handleSort('user__email')}>
                  Email <Sort/>
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Sort">
                <IconButton onClick={() => handleSort('created_at')}>
                  Date <Sort/>
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments?.map(comment => (
            <React.Fragment key={comment.id}>
              <TableRow>
                <TableCell>
                  {comment.user.username}
                </TableCell>
                <TableCell>{comment.user.email}</TableCell>
                <TableCell>{new Date(comment.created_at || '').toLocaleString()}</TableCell>
                <TableCell>{parse(comment.text)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleExpand(comment.id)}>
                    {expandedComments?.includes(comment.id) ? 'Collapse' : 'Expand'}
                  </IconButton>
                  <IconButton onClick={() => {/* Handle reply to comment */
                  }}>
                    <AddComment/>
                  </IconButton>
                </TableCell>
              </TableRow>
              {expandedComments?.includes(comment.id) && renderReplies(comment.replies)}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={totalComments}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};


export default CommentByIdPage;
