import classNames from 'classnames';
import React, { FunctionComponent, useRef, useEffect, useLayoutEffect } from 'react';
import './index.css';
import { PlayIcon } from '../PlayIcon';

export type RecommendationCardParams = {
  /**
   * Key press callback
   */
  onKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Mouse entered the card callback
   */
  onRender?: (element: HTMLDivElement) => void;
  /**
   * Image url for the background
   */
  backgroundUrl?: string;
  /**
   * Name of the card
   */
  name: string;
  /**
   * Is the card focused or not
   */
  isFocused: boolean;
};

export const RecommendationCard: FunctionComponent<RecommendationCardParams> = React.memo(({
  backgroundUrl,
  name,
  onKeyPress,
  onRender,
  isFocused,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const style = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : { backgroundColor: '#aaa' };
    
  useLayoutEffect(() => {
    if (!cardRef.current) {
      return;
    }

    onRender && onRender(cardRef.current);
  }, [onRender]);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    onRender && onRender(cardRef.current);
  }, [onRender])
    
  return (
    <div
      className={classNames('RecommendationCard', {
        'RecommendationCard__focused': isFocused,
      })}
      style={style}
      onKeyPress={onKeyPress}
      ref={cardRef}
    >
      <div className='RecommendationCard__PlayIcon'>
        <PlayIcon color='#FFF' />
      </div>
      <div className='RecommendationCard__Name'>
        <div>{name}</div>
      </div>
    </div>
  );
});