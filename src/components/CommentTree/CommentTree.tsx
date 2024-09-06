import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {CommentType} from "../../types/commentsTypes.ts";

interface CommentTreeProps {
  comment: CommentType;
  isExpanded: boolean;
  onExpand: () => void;
  onReply: () => void;
}

const CommentTree: React.FC<CommentTreeProps> = ({comment, isExpanded, onExpand, onReply}) => {
  return (
    <Box mb={2} ml={isExpanded ? 2 : 0}>
      <Typography variant="subtitle1">
        {comment.user.username} ({comment.user.email})
      </Typography>
      <Typography variant="body2">
        {comment.content}
      </Typography>
      <Button onClick={onReply}>Reply</Button>
      {isExpanded && (
        <Button onClick={onExpand}>Collapse</Button>
      )}
    </Box>
  );
};

export default CommentTree;
