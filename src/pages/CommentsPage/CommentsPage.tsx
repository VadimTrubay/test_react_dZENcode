import React, {useState, useEffect, ChangeEvent} from 'react';
import {
  Typography,
  Container,
  TablePagination,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Box, TableContainer, Paper
} from '@mui/material';
import {fetchComments} from "../../redux/comments/operations";
import CommentForm from "../../components/CommentForm/CommentForm";
import CommentTree from "../../components/CommentTree/CommentTree";
import ReplyModal from "../../components/ReplyModal/ReplyModal"; // Add this component
import {Sort} from '@mui/icons-material';
import {CommentType} from "../../types/commentsTypes.ts";
import {AppDispatch} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectAllComments, selectCountComments} from "../../redux/comments/selectors";

const CommentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allComments = useSelector<CommentType[]>(selectAllComments);
  const totalComments = useSelector<any>(selectCountComments);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortField, setSortField] = useState('created_at');
  const [replyModalOpen, setReplyModalOpen] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchComments({
      page: page + 1,
      page_size: rowsPerPage,
      ordering: `${sortOrder === 'asc' ? '' : '-'}${sortField}`
    }));
    setComments(allComments);
  }, [page, rowsPerPage, sortField, sortOrder, dispatch]);

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

  const handleReply = (parentId: number) => {
    setParentId(parentId);
    setReplyModalOpen(true);
  };

  const toggleExpand = (commentId: number) => {
    setExpandedComments(prevState =>
      prevState.includes(commentId)
        ? prevState.filter(id => id !== commentId)
        : [...prevState, commentId]
    );
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <TableContainer component={Paper}>
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
            {comments.map(comment => (
              <React.Fragment key={comment.id}>
                <CommentTree
                  comment={comment}
                  isExpanded={expandedComments.includes(comment.id)}
                  onExpand={() => toggleExpand(comment.id)}
                  onReply={() => handleReply(comment.id)}
                />
                {/* Render nested comments */}
                {expandedComments.includes(comment.id) && comment.replies.map(reply => (
                  <CommentTree
                    key={reply.id}
                    comment={reply}
                    isExpanded={expandedComments.includes(reply.id)}
                    onExpand={() => toggleExpand(reply.id)}
                    onReply={() => handleReply(reply.id)}
                  />
                ))}
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
      <ReplyModal
        open={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        parentId={parentId}
      />
    </Container>
  );
};

export default CommentsPage;
