import React from 'react';
import { storiesOf } from '@storybook/react';
import { UpArrowIcon } from '.';

storiesOf('components/atoms/UpArrowIcon', module)
  .add('small', () => (
    <div style={{ position: 'relative', width: 40, height: 40 }}>
      <UpArrowIcon />
    </div>
  ))
  .add('medium', () => (
    <div style={{ position: 'relative', width: 80, height: 80 }}>
      <UpArrowIcon />
    </div>
  ))
  .add('large', () => (
    <div style={{ position: 'relative', width: 160, height: 160 }}>
      <UpArrowIcon />
    </div>
  ))
  .add('red', () => (
    <div style={{ position: 'relative', width: 40, height: 40 }}>
      <UpArrowIcon color='#FF0000' />
    </div>
  ));