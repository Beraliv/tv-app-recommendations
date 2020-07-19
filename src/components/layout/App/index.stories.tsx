import React from 'react';
import { storiesOf } from '@storybook/react';
import { App } from '.';
import { SMALL_DOM_SIZE } from '../../const/SMALL_DOM_SIZE';
import { MEDIUM_DOM_SIZE } from '../../const/MEDIUM_DOM_SIZE';
import { LARGE_DOM_SIZE } from '../../const/LARGE_DOM_SIZE';

storiesOf('components/layout/App', module)
  .add('small', () => (
    <div style={{ ...SMALL_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <App />
    </div>
  ))
  .add('medium', () => (
    <div style={{ ...MEDIUM_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <App />
    </div>
  ))
  .add('large', () => (
    <div style={{ ...LARGE_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <App />
    </div>
  ));