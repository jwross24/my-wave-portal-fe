import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import {CleanedWave} from '../utils/wavePortal';

interface WavesTableProps {
  allWaves: CleanedWave[];
}

export function WavesTable({allWaves}: WavesTableProps) {
  return (
    <React.Fragment>
      {allWaves.length !== 0 && (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table sx={{maxWidth: 600}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allWaves.map((wave, idx) => (
                <TableRow
                  key={idx}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell>{wave.address}</TableCell>
                  <TableCell>{wave.message}</TableCell>
                  <TableCell>{wave.timestamp.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
}
