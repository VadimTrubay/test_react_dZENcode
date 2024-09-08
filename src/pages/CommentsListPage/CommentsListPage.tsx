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
  TableContainer,
  Paper,
  Button,
  Box
} from '@mui/material';
import {deleteComment, fetchCommentsList} from "../../redux/comments/operations";
import {Sort} from '@mui/icons-material';
import parse from 'html-react-parser';
import {CommentType} from "../../types/commentsTypes";
import {AppDispatch} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {selectAllComments, selectCountComments} from "../../redux/comments/selectors";
import {NavLink} from "react-router-dom";
import {mainUrls} from "../../config/urls";
import styles from "./CommentsListPage.module.css";
import CommentForm from "../../components/CommentForm/CommentForm.tsx";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow.tsx";
import {selectUser} from "../../redux/auth/selectors";
import {userType} from "../../types/authTypes.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import {FaEye} from "react-icons/fa";

const CommentsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allComments = useSelector<CommentType[]>(selectAllComments);
  const currentUser = useSelector<userType>(selectUser);
  const totalComments = useSelector<any>(selectCountComments);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('created_at');
  const [openAddCommentModal, setOpenAddCommentModal] = useState(false);
  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<CommentType | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleOpenAddCommentModal = () => setOpenAddCommentModal(true);
  const handleCloseAddCommentModal = () => setOpenAddCommentModal(false);

  const handleOpenDeleteCommentModal = (comment: CommentType) => {
    setCommentToDelete(comment);
    setOpenDeleteCommentModal(true);
  };
  const handleCloseDeleteCommentModal = () => {
    setOpenDeleteCommentModal(false);
    setCommentToDelete(null);
  };

  const handleDeleteComment = () => {
    if (commentToDelete) {
      dispatch(deleteComment(commentToDelete.id));
      handleCloseDeleteCommentModal();
      setRefreshFlag(!refreshFlag);
    }
  };

  const fetchParams = {
    page: page + 1,
    page_size: rowsPerPage,
    ordering: `${sortOrder === 'asc' ? '' : '-'}${sortField}`,
  };

  useEffect(() => {
    dispatch(fetchCommentsList(fetchParams));
  }, [page, rowsPerPage, sortField, sortOrder, refreshFlag, dispatch]);

  useEffect(() => {
    setComments(allComments);
  }, [allComments]);

  const handleChangePage = (event: any, newPage: number) => {
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

  const handleAddCommentSuccess = () => {
    setRefreshFlag(!refreshFlag);
    handleCloseAddCommentModal();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.firstColumn}>Content</TableCell>
              <TableCell className={styles.otherColumns}>
                <Tooltip title="Sort">
                  <IconButton onClick={() => handleSort('user__username')}>
                    User Name <Sort/>
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell className={styles.otherColumns}>
                <Tooltip title="Sort">
                  <IconButton onClick={() => handleSort('user__email')}>
                    Email <Sort/>
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell className={styles.otherColumns}>
                <Tooltip title="Sort">
                  <IconButton onClick={() => handleSort('created_at')}>
                    Date <Sort/>
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell className={styles.otherColumns}>View comment</TableCell>
              <TableCell className={styles.otherColumns}>Delete comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments?.map((comment) => !comment.parent && (
              <TableRow key={comment.id}>
                <TableCell className={styles.firstColumn}>{parse(comment.text)}</TableCell>
                <TableCell className={styles.otherColumns}>{comment.user.username}</TableCell>
                <TableCell className={styles.otherColumns}>{comment.user.email}</TableCell>
                <TableCell
                  className={styles.otherColumns}>{new Date(comment.created_at || '').toLocaleString()}</TableCell>
                <TableCell className={styles.otherColumns}>
                  <NavLink to={mainUrls.comments.id(comment.id)}>
                    <FaEye color={"blue"} size={25}/>
                  </NavLink>
                </TableCell>
                <TableCell className={styles.otherColumns}>
                  {currentUser?.id === comment?.user.id && (
                    <IconButton onClick={() => handleOpenDeleteCommentModal(comment)} color="error">
                      <DeleteIcon/>
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outlined" onClick={handleOpenAddCommentModal}>
          + Add Comment
        </Button>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={totalComments}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box>
          <CommentForm
            openAddCommentModal={openAddCommentModal}
            closeAddCommentModal={handleCloseAddCommentModal}
            onSuccess={handleAddCommentSuccess}
          />
        </Box>
      </TableContainer>
      {/* Delete modal */}
      <BaseModalWindow
        openModal={openDeleteCommentModal}
        closeModal={handleCloseDeleteCommentModal}
        style_close={styles.close}
        color_off={"error"}
        style_title={styles.title_delete}
        title={"Delete comment"}
        text={"Are you sure you want to delete this comment?"}
        onSubmit={(e) => {
          e.preventDefault();
          handleDeleteComment();
        }}
        style_done={{color: "red", fontSize: 50}}
      />
    </>
  );
};

export default CommentsListPage;
