import React from 'react';
import { storiesOf } from '@storybook/react';
import { Label } from './';

storiesOf('components/atoms/Label', module)
  .addDecorator(storyFn => (
    <div style={{ position: 'relative', backgroundColor: '#ccc' }}>{storyFn()}</div>
  ))
  .add('normal with remaining time text', () => <Label text='00:05' />);