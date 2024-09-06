// CommentTable.tsx
import React from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import parse from 'html-react-parser';

const CommentTable = ({comments}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Comment</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {comments.map((comment) => (
          <TableRow key={comment.id}>
            <TableCell>{comment.user.name}</TableCell>
            <TableCell>{comment.user.email}</TableCell>
            <TableCell>{new Date(comment.created_at).toLocaleString()}</TableCell>
            <TableCell>{parse(comment.text)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CommentTable;