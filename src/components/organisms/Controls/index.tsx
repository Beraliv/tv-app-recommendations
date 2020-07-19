import React, { FunctionComponent } from 'react';
import './index.css';
import { PlayIcon } from '../../atoms/PlayIcon';
import { PauseIcon } from '../../atoms/PauseIcon';
import { useControlsSettingsContext } from '../../../context/ControlsSettingsContext';
import { TimelineBar } from '../../atoms/TimelineBar';
import { usePlayingPositionContext } from '../../../context/PlayingPositionContext';
import { Label } from '../../atoms/Label';
import { getRemainingTimeString } from './getRemainingTimeString';
import { isNegativeFiniteNumber } from '../../../number/isNegativeFiniteNumber';
import { isPositiveFiniteNumber } from '../../../number/isPositiveFiniteNumber';

export type ControlsParams = {
  /**
   * Play callback
   */
  onPlay: VoidFunction;
  /**
   * Pause callback
   */
  onPause: VoidFunction;
  /**
   * Current state of the player playback
   */
  isPlaying: boolean;
}

export const Controls: FunctionComponent<ControlsParams> = ({ isPlaying, onPlay, onPause }) => {
  const { visibility: controlsVisibility } = useControlsSettingsContext();
  const { currentTime, duration } = usePlayingPositionContext();
  
  const togglePlayback = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  }

  const handlePause = ({ key }: React.KeyboardEvent<HTMLElement>) => {
    const isKeyPressable = key === 'Enter' || key === ' ';

    if (!isKeyPressable) {
      return;
    }
    
    onPause();
  };

  const handlePlay = ({ key }: React.KeyboardEvent<HTMLElement>) => {
    const isKeyPressable = key === 'Enter' || key === ' ';

    if (!isKeyPressable) {
      return;
    }
    
    onPlay();
  };

  const renderPlaybackButton = () => {
    if (isPlaying) {
      return (
        <div className='Controls__PauseIcon' tabIndex={0} onKeyPress={handlePause}>
          <PauseIcon color='#FFF' />
        </div>
      );
    }

    return (
      <div className='Controls__PlayIcon' tabIndex={0} onKeyPress={handlePlay}>
        <PlayIcon color='#FFF' />
      </div>
    );
  };

  const renderRemainingTime = () => {
    // negative currentTime is invalid
    if (isNegativeFiniteNumber(currentTime)) {
      return null;
    }

    // zero or negative duration is invalid
    if (!isPositiveFiniteNumber(duration)) {
      return null;
    }

    return (
      <div className='Controls__RemainingTime'>
        <Label text={getRemainingTimeString({ currentTime, duration })} />
      </div>
    );
  };

  return (
    <div className='Controls' onClick={togglePlayback}>
      {controlsVisibility.Controls && renderRemainingTime()}
      {controlsVisibility.Controls && (
        <TimelineBar
          className='Controls__TimelineBar'
          currentTime={currentTime}
          duration={duration}
        />
      )}
      {controlsVisibility.Controls && renderPlaybackButton()}
    </div>
  );
};