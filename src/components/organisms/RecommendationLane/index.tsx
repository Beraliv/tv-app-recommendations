import classNames from 'classnames';
import React, { FunctionComponent, useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Button } from '../../atoms/Button';
import './index.css';
import { UpArrowButton } from '../../molecules/UpArrowButton';
import { RecommendationCardParams, RecommendationCard } from '../../atoms/RecommendationCard';
import { SourceContextType } from '../../../context/SourceContext';
import { useControlsSettingsContext } from '../../../context/ControlsSettingsContext';

export type RecommendationLaneParams = {
  /**
   * Elements to recommend
   */
  elements: (Pick<RecommendationCardParams, 'backgroundUrl' | 'name'> & {
    id: number;
  })[];
  /**
   * Next source trigger
   */
  onSetSource: SourceContextType['setSource'];
}

export const RecommendationLane: FunctionComponent<RecommendationLaneParams> = ({
  elements,
  onSetSource,
}) => {
  const { visibility: controlsVisibility, setVisible: setControlVisible } = useControlsSettingsContext();
  const [isSliderCentered, setSliderCenterPosition] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const checkForSliderBeingCentered = () => {
    if (sliderRef.current === null) {
      return;
    }

    const { scrollWidth, clientWidth } = sliderRef.current;

    const isNextSliderCentered = Math.floor(scrollWidth) === Math.floor(clientWidth);
    setSliderCenterPosition(isNextSliderCentered);
  }

  useLayoutEffect(() => {
    // it fires synchronously after all DOM mutations
    // so this is valid way to check if scrollable lane should be centered
    // at the beginning
    checkForSliderBeingCentered();
  });

  useEffect(() => {
    // it fires asynchronously
    // so this is valid way to check if scrollable lane should be centered
    // in any case except for the start
    window.addEventListener('resize', checkForSliderBeingCentered);

    return () => {
      window.removeEventListener('resize', checkForSliderBeingCentered);
    }
  }, []);

  const toggleControlsVisibility = () => {
    if (controlsVisibility.Recommendations) {
      setControlVisible('Controls');
      return;
    }

    setControlVisible('Recommendations');
  };

  const handleButtonKeyPress = ({ key }: React.KeyboardEvent<HTMLElement>) => {
    const isKeyPressable = key === 'Enter' || key === ' ';

    if (!isKeyPressable) {
      return;
    }

    toggleControlsVisibility();
  }

  const createSetSourceHandler = (id: number) => () => {
    onSetSource(id);
    setControlVisible('Controls');
  }

  return (
    <div className='RecommendationLane'>
      <div className='RecommendationLane__Line'>
        <Button
          className={classNames('RecommendationLane__StartButton', {
            RecommendationLane__StartButton_pressed: controlsVisibility.Recommendations,
          })}
          onKeyPress={handleButtonKeyPress}
        >
          Similar videos
        </Button>
        {controlsVisibility.Recommendations && (
          <UpArrowButton
            className='RecommendationLane__UpArrowButton'
            onKeyPress={handleButtonKeyPress}
          />
        )}
        <div />
      </div>
      {controlsVisibility.Recommendations && (
        <div
          className={classNames('RecommendationLane__Slider', {
            RecommendationLane__Slider_centered: isSliderCentered,
          })}
          ref={sliderRef}
        >
          {elements.map(element => {
            const handleSetSource = createSetSourceHandler(element.id);

            return (
              <RecommendationCard key={element.id} {...element} onKeyPress={handleSetSource} />
            );
          })}
        </div>
      )}
    </div>
  );
};