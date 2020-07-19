import React from 'react';
import { storiesOf } from '@storybook/react';
import { PlayIcon } from '.';

storiesOf('components/atoms/PlayIcon', module)
  .add('small', () => (
    <div style={{ position: 'relative', width: 40, height: 40 }}>
      <PlayIcon />
    </div>
  ))
  .add('medium', () => (
    <div style={{ position: 'relative', width: 80, height: 80 }}>
      <PlayIcon />
    </div>
  ))
  .add('large', () => (
    <div style={{ position: 'relative', width: 160, height: 160 }}>
      <PlayIcon />
    </div>
  ))
  .add('red', () => (
    <div style={{ position: 'relative', width: 40, height: 40 }}>
      <PlayIcon color='#FF0000' />
    </div>
  ));