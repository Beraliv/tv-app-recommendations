import React from 'react';
import { storiesOf } from '@storybook/react';
import { Controls } from './';
import { SMALL_DOM_SIZE } from '../../const/SMALL_DOM_SIZE';
import { MEDIUM_DOM_SIZE } from '../../const/MEDIUM_DOM_SIZE';
import { LARGE_DOM_SIZE } from '../../const/LARGE_DOM_SIZE';
import { action } from '@storybook/addon-actions';

storiesOf('components/organisms/Controls', module)
  .add('small playing', () => (
    <div style={{ ...SMALL_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <Controls isPlaying={true} onPlay={action('play')} onPause={action('pause')} />
    </div>
  ))
  .add('small paused', () => (
    <div style={{ ...SMALL_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <Controls isPlaying={false} onPlay={action('play')} onPause={action('pause')} />
    </div>
  ))
  .add('medium playing', () => (
    <div style={{ ...MEDIUM_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <Controls isPlaying={true} onPlay={action('play')} onPause={action('pause')} />
    </div>
  ))
  .add('medium paused', () => (
    <div style={{ ...MEDIUM_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <Controls isPlaying={false} onPlay={action('play')} onPause={action('pause')} />
    </div>
  ))
  .add('large playing', () => (
    <div style={{ ...LARGE_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <Controls isPlaying={true} onPlay={action('play')} onPause={action('pause')} />
    </div>
  ))
  .add('large paused', () => (
    <div style={{ ...LARGE_DOM_SIZE, position: 'relative', backgroundColor: '#ccc' }}>
      <Controls isPlaying={false} onPlay={action('play')} onPause={action('pause')} />
    </div>
  ));