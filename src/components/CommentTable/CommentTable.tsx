import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';

interface CommentTableProps {
  comments: any[];
}

const CommentTable: React.FC<CommentTableProps> = ({comments}) => {
  // Функция для сортировки данных
  const sortedComments = [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>Username</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Email</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Date</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedComments.map(comment => (
            <TableRow key={comment.id}>
              <TableCell>{comment.userName}</TableCell>
              <TableCell>{comment.email}</TableCell>
              <TableCell>{comment.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommentTable;
