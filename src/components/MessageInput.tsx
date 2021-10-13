import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react';

interface MessageInputProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MessageInput({value, handleChange}: MessageInputProps) {
  return (
    <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 0.5}}>
      <CreateOutlinedIcon sx={{color: 'primary', mr: 1, my: 0.5}} />
      <TextField
        required
        id="message-input"
        label="Write a message"
        variant="standard"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
