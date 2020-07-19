import { createContext, useState, useEffect, useContext } from 'react';
import { noop } from '../function/noop';
import { ContextReducerParams } from './ContextReducer';

export type PlayingStateContextType = {
  /**
   * Current playing state
   */
  playingState: 'idle' | 'play' | 'pause' | 'end';
  /**
   * Video play trigger
   */
  play: VoidFunction;
  /**
   * Video pause trigger
   */
  pause: VoidFunction;
};

const DEFAULT_PLAYING_STATE_CONTEXT: PlayingStateContextType = {
  playingState: 'idle',
  play: noop,
  pause: noop,
}

export const PlayingStateContext = createContext<PlayingStateContextType>(DEFAULT_PLAYING_STATE_CONTEXT);

export const reducePlayingStateContext = ({ videoElement }: ContextReducerParams): PlayingStateContextType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [playingState, setPlayingState] = useState<PlayingStateContextType['playingState']>('idle');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pauseStatus, setPauseStatus] = useState<'safe' | 'unsafe'>('unsafe');

  const onIdle = () => {
    console.debug('>>> onIdle');
    setPlayingState('idle');
  }

  const onPlay = () => {
    console.debug('>>> onPlay');
    setPlayingState('play');
  };

  const onPause = () => {
    console.debug('>>> onPause');
    setPlayingState('pause');
  };

  const onEnd = () => {
    console.debug('>>> onEnd');
    setPlayingState('end');
  }

  const onError = (error: ErrorEvent) => {
    console.error('>>> onError', error);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setPauseStatus('unsafe');

    videoElement.addEventListener('play', onPlay);
    videoElement.addEventListener('pause', onPause);
    videoElement.addEventListener('ended', onEnd);
    videoElement.addEventListener('error', onError);

    return () => {
      videoElement.removeEventListener('play', onPlay);
      videoElement.removeEventListener('pause', onPause);
      videoElement.removeEventListener('ended', onEnd);
      videoElement.removeEventListener('error', onError);
    }
  }, [videoElement]);

  const play = () => {
    videoElement.play()
      .then(() => {
        setPauseStatus('safe');
      }).catch(() => {
        onIdle();
      });
  };

  const pause = () => {
    if (pauseStatus === 'unsafe') {
      return;
    }

    // when set source happens
    // you need to stop before loading next source
    // unfortunately, there is no event for that
    // so onPause callback is triggered for that
    onPause();

    videoElement.pause();
  };

  return {
    playingState,
    play,
    pause,
  };
};

export const usePlayingStateContext = () => useContext(PlayingStateContext);