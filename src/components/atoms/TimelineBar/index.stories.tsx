import React from 'react';
import { storiesOf } from '@storybook/react';
import { TimelineBar } from './';

storiesOf('components/atoms/TimelineBar', module)
  .addDecorator(storyFn => (
    <div style={{ position: 'relative', height: 50, width: '100%', backgroundColor: '#000' }}>{storyFn()}</div>
  ))
  .add('view with incorrect negative currentTime', () => (
    <TimelineBar
      currentTime={-1}
      duration={10}
    />
  ))
  .add('view with zero duration', () => (
    <TimelineBar
      currentTime={-1}
      duration={0}
    />
  ))
  .add('start view', () => (
    <TimelineBar
      currentTime={0}
      duration={10}
    />
  ))
  .add('playing view', () => (
    <TimelineBar
      currentTime={5}
      duration={10}
    />
  ))
  .add('end view', () => (
    <TimelineBar
      currentTime={10}
      duration={10}
    />
  ))
  .add('view with incorrect bigger than duration currentTime', () => (
    <TimelineBar
      currentTime={15}
      duration={10}
    />
  ));