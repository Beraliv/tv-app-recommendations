import { createContext, useState, useEffect, useContext } from 'react';
import { ContextReducerParams } from './ContextReducer';
import { isPositiveFiniteNumber } from '../number/isPositiveFiniteNumber';
import { isNegativeFiniteNumber } from '../number/isNegativeFiniteNumber';

export type PlayingPositionContextType = {
  /**
   * Current video time
   */
  currentTime: number;
  /**
   * Video duration
   */
  duration: number;
};

const DEFAULT_PLAYING_POSITION_CONTEXT: PlayingPositionContextType = {
  currentTime: 0,
  duration: Infinity,
}

export const PlayingPositionContext = createContext<PlayingPositionContextType>(DEFAULT_PLAYING_POSITION_CONTEXT);

export const reducePlayingPositionContext = ({ videoElement }: ContextReducerParams): PlayingPositionContextType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [currentTime, setCurrentState] = useState(DEFAULT_PLAYING_POSITION_CONTEXT.currentTime);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [duration, setDuration] = useState(DEFAULT_PLAYING_POSITION_CONTEXT.duration);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const onDurationChange = () => {
      const { duration: nextDuration } = videoElement;

      if (isPositiveFiniteNumber(nextDuration)) {
        setDuration(nextDuration);
      }
    };
  
    const onCurrentTimeChange = () => {
      const { currentTime: nextTime } = videoElement;

      // zero and positive numbers only
      if (!isNegativeFiniteNumber(nextTime)) {
        setCurrentState(nextTime);
      }
    };

    const onCurrentTimeAndDurationChange = () => {
      onDurationChange();
      onCurrentTimeChange();
    };

    videoElement.addEventListener('durationchange', onCurrentTimeAndDurationChange);
    videoElement.addEventListener('timeupdate', onCurrentTimeChange);

    return () => {
      videoElement.removeEventListener('durationchange', onCurrentTimeAndDurationChange);
      videoElement.removeEventListener('timeupdate', onCurrentTimeChange);
    }
  }, [videoElement]);

  return {
    currentTime,
    duration,
  };
};

export const usePlayingPositionContext = () => useContext(PlayingPositionContext);