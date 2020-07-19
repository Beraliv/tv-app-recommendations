import React, { FunctionComponent } from 'react';
import './index.css';
import { PlayIcon } from '../PlayIcon';

export type RecommendationCardParams = {
  /**
   * Key press callback
   */
  onKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Image url for the background
   */
  backgroundUrl?: string;
  /**
   * Name of the card
   */
  name: string;
};

export const RecommendationCard: FunctionComponent<RecommendationCardParams> = ({
  backgroundUrl,
  name,
  onKeyPress,
}) => {
  const style = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : { backgroundColor: '#aaa' };
    
  return (
    <div
      tabIndex={1}
      className='RecommendationCard'
      style={style}
      onKeyPress={onKeyPress}
    >
      <div className='RecommendationCard__PlayIcon'>
        <PlayIcon color='#FFF' />
      </div>
      <div className='RecommendationCard__Name'>
        <div>{name}</div>
      </div>
    </div>
  );
};