import classNames from 'classnames';
import React, { FunctionComponent, useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Button } from '../../atoms/Button';
import { useVisibility } from '../../../hooks/useVisibility';
import './index.css';
import { UpArrowButton } from '../../molecules/UpArrowButton';
import { RecommendationCardParams, RecommendationCard } from '../../atoms/RecommendationCard';

const noop = (): void => {
  // nothing to do
};

export type RecommendationLaneParams = {
  elements: (Pick<RecommendationCardParams, 'backgroundUrl' | 'name'> & {
    id: string;
  })[];
}

export const RecommendationLane: FunctionComponent<RecommendationLaneParams> = ({
  elements,
}) => {
  const [isSliderAndIconVisible, toggleSliderAndIconVisibility] = useVisibility(false);
  const [isSliderCentered, setSliderCenterPosition] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const onResize = () => {
    if (sliderRef.current === null) {
      return;
    }

    const { scrollWidth, clientWidth } = sliderRef.current;

    const isNextSliderCentered = Math.floor(scrollWidth) === Math.floor(clientWidth);
    setSliderCenterPosition(isNextSliderCentered);
  }

  // eslint-disable-next-line
  useLayoutEffect(() => {
    onResize();
  });

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  const handleButtonKeyPress = ({ key }: React.KeyboardEvent<HTMLElement>) => {
    const isKeyPressable = key === 'Enter' || key === ' ';

    if (!isKeyPressable) {
      return;
    }

    toggleSliderAndIconVisibility();
  }

  return (
    <div className='RecommendationLane'>
      <div className='RecommendationLane__Line'>
        <Button onKeyPress={handleButtonKeyPress}>Similar videos</Button>
        {isSliderAndIconVisible && (
          <UpArrowButton
            className='RecommendationLane__UpArrowButton'
            onKeyPress={handleButtonKeyPress}
          />
        )}
        <div />
      </div>
      {isSliderAndIconVisible && (
        <div
          className={classNames('RecommendationLane__Slider', {
            RecommendationLane__Slider_centered: isSliderCentered,
          })}
          ref={sliderRef}
        >
          {elements.map(element => (
            <RecommendationCard key={element.id} {...element} onKeyPress={noop} />
          ))}
        </div>
      )}
    </div>
  );
};