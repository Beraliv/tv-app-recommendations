import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecommendationCard, RecommendationCardParams } from '.';
import { MEDIUM_DOM_SIZE } from '../../const/MEDIUM_DOM_SIZE';
import { action } from '@storybook/addon-actions';
import assets from '../../../data/assets.json';

const RecommendationCardStory = ({ backgroundUrl, name }: Omit<RecommendationCardParams, 'onClick' | 'onKeyPress'>) => (
  <RecommendationCard
    backgroundUrl={backgroundUrl}
    name={name}
    onKeyPress={action('key-press')}
  />
);

storiesOf('components/atoms/RecommendationCard', module)
  .addDecorator(storyFn => (
    <div style={{ ...MEDIUM_DOM_SIZE, position: 'relative', padding: 30, backgroundColor: '#ccc' }}>
      {storyFn()}
    </div>
  ))
  .add('with background image (0)', () => (
    <RecommendationCardStory backgroundUrl={assets[0].image} name={assets[0].title} />
  ))
  .add('without background image', () => (
    <RecommendationCardStory name={assets[0].title} />
  ))
  .add('with background image (1)', () => (
    <RecommendationCardStory backgroundUrl={assets[1].image} name={assets[1].title} />
  ))
  .add('with background image (2)', () => (
    <RecommendationCardStory backgroundUrl={assets[2].image} name={assets[2].title} />
  ))
  .add('with background image (3)', () => (
    <RecommendationCardStory backgroundUrl={assets[3].image} name={assets[3].title} />
  ));