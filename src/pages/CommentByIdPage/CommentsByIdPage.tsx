import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectCommentById, selectRefresh} from "../../redux/comments/selectors.ts";
import {fetchCommentById} from "../../redux/comments/operations.ts";
import CommentTree from "../../components/CommentTree/CommentTree.tsx";
import {AppDispatch} from "../../redux/store.ts";
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import {CommentType} from "../../types/commentsTypes.ts";


const CommentsByIdPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams<{ id: string }>();
  const comment = useSelector(selectCommentById) as CommentType;
  const isRefresh = useSelector<boolean>(selectRefresh);


  useEffect(() => {
    dispatch(fetchCommentById(Number(id)));
  }, [dispatch, id, isRefresh]);


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Comments for Post ID: {id}
      </Typography>
      <Box>
        {comment ? (
          <CommentTree key={comment.id} comment={comment}/>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress/>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CommentsByIdPage;
