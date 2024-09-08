// CommentTree.tsx
import {Box, IconButton, Typography} from "@mui/material";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow.tsx";
import CommentFormChildren from "../../components/CommentFormChildren/CommentFormChildren.tsx";
import {AppDispatch} from "../../redux/store.ts";
import {deleteComment} from "../../redux/comments/operations.ts";
import {CommentType} from "../../types/commentsTypes.ts";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import styles from "./CommentTree.module.css"
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {userType} from "../../types/authTypes.ts";
import {selectUser} from "../../redux/auth/selectors";


const CommentTree = ({comment}: { comment: CommentType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector<userType>(selectUser);
  const [openAddCommentModal, setOpenAddCommentModal] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<CommentType | null>(null);

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
    dispatch(deleteComment(commentToDelete.id))
    handleCloseDeleteCommentModal();
  };

  const handleAddCommentSuccess = () => {
    handleCloseAddCommentModal();
  };

  const toggleReplies = () => setShowReplies(!showReplies);

  return (
    <>
      <Box sx={{marginLeft: comment.parent ? 4 : 0, border: '1px solid #ddd', padding: 2, marginTop: 2}}>
        <Box mb={1}>
          <Typography component="span" variant="body1" fontWeight="bold">
            {comment.user.username}
          </Typography>
          <Typography component="span" variant="caption" color="textSecondary" sx={{ml: 1}}>
            {new Date(comment.created_at).toLocaleString()}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" component="div" dangerouslySetInnerHTML={{__html: comment.text}}/>
        </Box>
        {comment.file && <Button href={comment.file} target="_blank" rel="noopener noreferrer">Download File</Button>}
        <Box mt={2}>
          <Button variant="outlined" onClick={handleOpenAddCommentModal}>+ Add Comment</Button>
          {currentUser?.id === comment?.user.id &&
            <IconButton onClick={() => handleOpenDeleteCommentModal(comment)} color="error">
              <DeleteIcon/>
            </IconButton>
          }
          {comment.replies && comment.replies.length > 0 && (
            <Button onClick={toggleReplies} endIcon={showReplies ? <ExpandLessIcon/> : <ExpandMoreIcon/>}>
              {showReplies ? 'Hide Replies' : 'Show Replies'}
            </Button>
          )}
        </Box>
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <Box sx={{ml: 4}}>
            {comment.replies.map(reply => (
              <CommentTree key={reply.id} comment={reply}/>
            ))}
          </Box>
        )}
      </Box>
      <Box>
        <CommentFormChildren
          comment={comment}
          openAddCommentModal={openAddCommentModal}
          closeAddCommentModal={handleCloseAddCommentModal}
          onSuccess={handleAddCommentSuccess}
        />
      </Box>

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

export default CommentTree;