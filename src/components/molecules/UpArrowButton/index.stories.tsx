import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { UpArrowButton } from './';

storiesOf('components/molecules/UpArrowButton', module)
  .addDecorator(storyFn => (
    <div style={{ position: 'relative', backgroundColor: '#ccc', width: 50 }}>{storyFn()}</div>
  ))
  .add('not key pressable', () => <UpArrowButton />)
  .add('key pressable', () => <UpArrowButton onKeyPress={action('key press')} />)
  .add('only Enter pressable', () => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Enter') {
        return;
      }

      action('key press')(event);
    }

    return <UpArrowButton onKeyPress={handleKeyPress} />;
  })