import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectCommentById} from "../../redux/comments/selectors.ts";
import {deleteComment, fetchCommentById} from "../../redux/comments/operations.ts";
import {CommentType} from "../../types/commentsTypes.ts";
import CommentForm from "../../components/CommentForm/CommentForm.tsx";
import {Box} from "@mui/material";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow.tsx";
import styles from "../CommentsListPage/CommentsListPage.module.css";

// Recursive Comment Component
const Comment = ({comment, onReply, onDelete}) => {
  const [showReplies, setShowReplies] = useState(true);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div
      style={{marginLeft: comment.parent ? '40px' : '0', border: '1px solid #ddd', padding: '10px', marginTop: '10px'}}>
      <div>
        <strong>{comment.user.username}</strong> <small>{new Date(comment.created_at).toLocaleString()}</small>
      </div>
      <div dangerouslySetInnerHTML={{__html: comment.text}}/>
      {comment.file && <a href={comment.file} target="_blank" rel="noopener noreferrer">Download File</a>}
      <div style={{marginTop: '10px'}}>
        <button onClick={() => onReply(comment.id)}>+ Add Reply</button>
        <button onClick={() => onDelete(comment.id)}>🗑 Delete</button>
        {comment.replies && comment.replies.length > 0 && (
          <button onClick={toggleReplies}>{showReplies ? 'Hide Replies' : 'Show Replies'}</button>
        )}
      </div>
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} onReply={onReply} onDelete={onDelete}/>
          ))}
        </div>
      )}
    </div>
  );
};

// Page Component for displaying comments by ID
const CommentsByIdPage: React.FC = () => {
  const dispatch = useDispatch();
  const {id} = useParams<{ id: string }>();
  const backendData = useSelector(selectCommentById);
  const [comment, setComment] = useState<CommentType | null>(null);
  const [openAddCommentModal, setOpenAddCommentModal] = useState(false);
  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<CommentType | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // Track when to refresh comments

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

  const handleAddCommentSuccess = () => {
    setRefreshFlag(!refreshFlag); // Trigger refresh after adding a comment
    handleCloseAddCommentModal();
  };

  const handleDeleteComment = () => {
    if (commentToDelete) {
      dispatch(deleteComment(commentToDelete.id));
      handleCloseDeleteCommentModal();
      setRefreshFlag(!refreshFlag); // Trigger refresh after deletion
    }
  };

  // Fetch the comment data by ID from Redux
  useEffect(() => {
    dispatch(fetchCommentById(Number(id)));
  }, [dispatch, id, refreshFlag]);

  // Update the comment state whenever backendData changes
  useEffect(() => {
    if (backendData) {
      setComment(backendData); // backendData is assumed to be a single comment object
    }
  }, [backendData]);

  const handleReply = (parentId: number) => {
    // Logic to open a reply form (possibly in a modal) and send the new reply
    handleOpenAddCommentModal(); // Opens the comment form modal for replying
  };

  const handleDelete = (commentId: number) => {
    handleOpenDeleteCommentModal(comment!); // Opens the delete confirmation modal
  };

  return (
    <div>
      <h2>Comments for Post ID: {id}</h2>
      <div>
        {comment ? (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleDelete}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Box>
        <CommentForm
          openAddCommentModal={openAddCommentModal}
          closeAddCommentModal={handleCloseAddCommentModal}
          onSuccess={handleAddCommentSuccess} // Pass success handler
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
    </div>
  );
};

export default CommentsByIdPage;
