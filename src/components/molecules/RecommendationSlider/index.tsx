import classNames from 'classnames';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './index.css';
import { RecommendationCard } from '../../atoms/RecommendationCard';
import { useControlsSettingsContext } from '../../../context/ControlsSettingsContext';
import { RecommendationLaneParams } from '../../organisms/RecommendationLane';
import { useSelectionContext } from '../../../context/SelectionContext';

export type RecommendationSliderParams = RecommendationLaneParams;

export const RecommendationSlider = ({
  elements,
  onSetSource,
}: RecommendationSliderParams) => {
  const { setVisible: setControlVisible } = useControlsSettingsContext();
  const [isSliderCentered, setSliderCenterPosition] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const { currentSelection, nextSelection, left, right } = useSelectionContext();

  const checkForSliderBeingCentered = () => {
    if (sliderRef.current === null) {
      return;
    }

    const { scrollWidth, clientWidth } = sliderRef.current;

    const isNextSliderCentered = Math.floor(scrollWidth) === Math.floor(clientWidth);
    setSliderCenterPosition(isNextSliderCentered);
  };

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 37) {
        left();
        return;
      }

      if (event.keyCode === 39) {
        right(elements.length);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [elements, left, right]);

  const createSetSourceHandler = (id: number) => () => {
    onSetSource(id);
    setControlVisible('Controls');
  };

  return (
    <div
      className={classNames('RecommendationSlider', {
        RecommendationSlider_centered: isSliderCentered,
      })}
      ref={sliderRef}
    >
      {elements.map((element, index) => {
        const handleSetSource = createSetSourceHandler(element.id);

        const isExpectedNextFocused = index === nextSelection;
        const isCurrentFocused = index === currentSelection;

        const handleRender = (card: HTMLDivElement) => {
          if (card === null) {
            return;
          }

          if (isExpectedNextFocused) {
            // scroll needs to be delayed
            // to be properly rendered
            setTimeout(() => {
              card.scrollIntoView({ behavior: 'smooth' });
            }, 0);
          }
        };

        return (
          <RecommendationCard
            key={element.id}
            {...element}
            onKeyPress={handleSetSource}
            isFocused={isCurrentFocused}
            onRender={handleRender}
          />
        );
      })}
    </div>
  );
};