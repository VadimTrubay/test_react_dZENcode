import React from 'react';
import { Button, Input } from '@mui/material';

const FileUploader: React.FC = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Обработать файл
      console.log('Selected file:', file);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
