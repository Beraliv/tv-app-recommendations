import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Button } from './';

storiesOf('components/atoms/Button', module)
  .addDecorator(storyFn => (
    <div style={{ position: 'relative', backgroundColor: '#ccc' }}>{storyFn()}</div>
  ))
  .add('not key pressable', () => <Button>Key press me</Button>)
  .add('key pressable', () => <Button onKeyPress={action('key press')}>Key press me</Button>)
  .add('only Enter pressable', () => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Enter') {
        return;
      }

      action('key press')(event);
    }

    return <Button onKeyPress={handleKeyPress}>Key press me</Button>;
  })