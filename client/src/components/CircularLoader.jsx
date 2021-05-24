import { CircularProgress } from '@material-ui/core';
import React from 'react';

export default function CircularLoader() {
  return (
    <div style={{ marginTop: '158px', textAlign: 'center', width: '100%' }}>
      <CircularProgress color='primary' />
    </div>
  );
}
