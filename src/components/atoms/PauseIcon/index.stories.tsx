import React from 'react';
import { storiesOf } from '@storybook/react';
import { PauseIcon } from './';

storiesOf('components/atoms/PauseIcon', module)
  .add('small', () => (
    <div style={{ position: 'relative', width: 40, height: 40 }}>
      <PauseIcon />
    </div>
  ))
  .add('medium', () => (
    <div style={{ position: 'relative', width: 80, height: 80 }}>
      <PauseIcon />
    </div>
  ))
  .add('large', () => (
    <div style={{ position: 'relative', width: 160, height: 160 }}>
      <PauseIcon />
    </div>
  ))
  .add('red', () => (
    <div style={{ position: 'relative', width: 40, height: 40 }}>
      <PauseIcon color='#FF0000' />
    </div>
  ));