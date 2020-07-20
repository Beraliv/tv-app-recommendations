import React, { FunctionComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { App } from '.';
import { SMALL_DOM_SIZE } from '../../const/SMALL_DOM_SIZE';
import { MEDIUM_DOM_SIZE } from '../../const/MEDIUM_DOM_SIZE';
import { LARGE_DOM_SIZE } from '../../const/LARGE_DOM_SIZE';
import { ContextReducerParams } from '../../../context/ContextReducer';
import { PlayingStateContext, PlayingStateContextType } from '../../../context/PlayingStateContext';
import { SourceContext } from '../../../context/SourceContext';
import { VideoElementContext } from '../../../context/VideoElementContext';
import { ControlsSettingsContext, ControlsSettingsContextType } from '../../../context/ControlsSettingsContext';
import { PlayingPositionContext } from '../../../context/PlayingPositionContext';
import { action } from '@storybook/addon-actions';
import assets from '../../../data/assets.json';
import { createContextReducer } from '../../../function/createContextReducer';
import { SelectionContext } from '../../../context/SelectionContext';

type StoryAppParams =
  & Pick<PlayingStateContextType, 'playingState'>
  & Pick<ControlsSettingsContextType, 'visibility'>;

const StoryApp = ({
  playingState,
  visibility,
}: StoryAppParams) => {
  const currentTime = playingState === 'idle'
    ? 0
    : playingState === 'play'
      ? 5
      : playingState === 'pause'
        ? 10
        // playingState === 'end'
        : 15;
  
  const duration = 15;

  const videoElement = document.createElement('video');
  videoElement.id = 'video';

  const storyContextComposition: FunctionComponent<ContextReducerParams>[] = [
    // testing playing state in PlayingStateContext
    props => <PlayingStateContext.Provider value={{
      play: action('play'),
      pause: action('pause'),
      playingState,
    }} children={props.children} />,
    // nothing to test in SourceContext
    props => <SourceContext.Provider value={{
      setSource: action('setSource'),
      currentSource: assets[0],
      otherSources: assets.slice(1),
    }} children={props.children} />,
    // nothing to test in VideoElementContext
    props => <VideoElementContext.Provider value={{
      videoElement,
    }} children={props.children} />,
    // testing visibility in ControlsSettingsContext
    props => <ControlsSettingsContext.Provider value={{
      setVisible: action('setVisible'),
      visibility
    }} children={props.children} />,
    // nothing to test in PlayingPositionContext
    props => <PlayingPositionContext.Provider value={{
      currentTime,
      duration,
    }} children={props.children} />,
    // nothing to test in SelectionContext
    props => <SelectionContext.Provider value={{
      left: action('left'),
      right: action('right'),
      currentSelection: 0,
      nextSelection: 1,
    }} children={props.children} />,
  ];

  const StoryContextReducer = createContextReducer(storyContextComposition);

  return (
    <StoryContextReducer videoElement={videoElement}>
      <App />
    </StoryContextReducer>
  );
};

const CONTROLS_VISIBILITY: ControlsSettingsContextType['visibility'] = { Controls: true, Recommendations: false };
const RECOMMENDATIONS_VISIBILITY: ControlsSettingsContextType['visibility'] = { Controls: false, Recommendations: true };

const storiesForSize = (sizeName: 'small' | 'middle' | 'large') => {
  const domSize = sizeName === 'small'
    ? SMALL_DOM_SIZE
    : sizeName === 'middle'
      ? MEDIUM_DOM_SIZE
      : LARGE_DOM_SIZE;

  return storiesOf('components/layout/App', module)
    .add(`${sizeName} start with visible controls`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='idle' visibility={CONTROLS_VISIBILITY} />
      </div>
    ))
    .add(`${sizeName} start with visible recommendations`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='idle' visibility={RECOMMENDATIONS_VISIBILITY} />
      </div>
    ))
    .add(`${sizeName} playing with visible controls`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='play' visibility={CONTROLS_VISIBILITY} />
      </div>
    ))
    .add(`${sizeName} playing with visible recommendations`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='play' visibility={RECOMMENDATIONS_VISIBILITY} />
      </div>
    ))
    .add(`${sizeName} paused with visible controls`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='pause' visibility={CONTROLS_VISIBILITY} />
      </div>
    ))
    .add(`${sizeName} paused with visible recommendations`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='pause' visibility={RECOMMENDATIONS_VISIBILITY} />
      </div>
    ))
    .add(`${sizeName} end with visible controls`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='end' visibility={CONTROLS_VISIBILITY} />
      </div>
    ))
    .add(`${sizeName} end with visible recommendations`, () => (
      <div style={{ ...domSize, position: 'relative', backgroundColor: '#ccc' }}>
        <StoryApp playingState='end' visibility={RECOMMENDATIONS_VISIBILITY} />
      </div>
    ));
};

storiesForSize('small');
storiesForSize('middle');
storiesForSize('large');