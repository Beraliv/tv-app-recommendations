import React, { useLayoutEffect } from 'react';
import './index.css';
import { RecommendationLane } from '../../organisms/RecommendationLane';
import { Controls } from '../../organisms/Controls';
import { usePlayingStateContext } from '../../../context/PlayingStateContext';
import { useSourceContext } from '../../../context/SourceContext';
import { useVideoElementContext } from '../../../context/VideoElementContext';

export const App: React.FunctionComponent = () => {
  const { playingState, play, pause } = usePlayingStateContext();
  const { otherSources, setSource } = useSourceContext();
  const { videoElement } = useVideoElementContext();

  useLayoutEffect(() => {
    const app = document.getElementsByClassName('app')[0];
    const controls = document.getElementsByClassName('Controls')[0];

    if (!app) {
      return;
    }

    if (!controls) {
      return;
    }

    app.insertBefore(videoElement, controls);
  });

  const handleSetSource = (id: number) => {
    setSource(id);

    // when set source happens
    // you need to stop before loading next source
    // unfortunately, there is no event for that
    // so onPause callback is triggered for that
    pause();
  }

  const elements = otherSources
    .map(asset => ({
      backgroundUrl: asset.image,
      name: asset.title,
      id: asset.id,
    }));

  return (
    <div className="app">
      <Controls onPlay={play} onPause={pause} isPlaying={playingState === 'play'} />
      <RecommendationLane elements={elements} onSetSource={handleSetSource} />
    </div>
  );
};
