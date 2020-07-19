import React from 'react';
import { Button } from '../../atoms/Button';
import { useVisibility } from '../../../hooks/useVisibility';
import './index.css';
import { UpArrowButton } from '../../molecules/UpArrowButton';

export const RecommendationLane = () => {
  const [isSliderAndIconVisible, toggleSliderAndIconVisibility] = useVisibility(false);

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
        <div className="RecommendationLane__Slider"></div>
      )}
    </div>
  );
};