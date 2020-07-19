import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Button } from '../../atoms/Button';
import './index.css';
import { UpArrowButton } from '../../molecules/UpArrowButton';
import { RecommendationCardParams } from '../../atoms/RecommendationCard';
import { SourceContextType } from '../../../context/SourceContext';
import { useControlsSettingsContext } from '../../../context/ControlsSettingsContext';
import { RecommendationSlider } from '../../molecules/RecommendationSlider';
import { useSelectionContext } from '../../../context/SelectionContext';

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
  const { currentSelection } = useSelectionContext();

  const toggleControlsVisibility = () => {
    if (controlsVisibility.Recommendations) {
      setControlVisible('Controls');
      return;
    }

    setControlVisible('Recommendations');
  };

  const handleButtonKeyPress = ({ key }: React.KeyboardEvent<HTMLElement>) => {
    const isKeyPressable = key === 'Enter';

    if (!isKeyPressable) {
      return;
    }

    if (controlsVisibility.Recommendations) {
      onSetSource(elements[currentSelection].id);
      setControlVisible('Controls');

      return;
    }

    toggleControlsVisibility();
  };

  return (
    <div className='RecommendationLane'>
      <div className='RecommendationLane__Line'>
        <Button
          className={classNames('RecommendationLane__StartButton', {
            RecommendationLane__StartButton_pressed: controlsVisibility.Recommendations,
          })}
          onKeyPress={handleButtonKeyPress}
          tabIndex={0}
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
        <RecommendationSlider
          elements={elements}
          onSetSource={onSetSource}
        />
      )}
    </div>
  );
};