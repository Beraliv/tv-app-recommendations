import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import './index.css';

export type ButtonParams = {
  /**
   * Custom class name for outer styles
   */
  className?: string;
  /**
   * Key press callback
   */
  onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
};

export const Button: FunctionComponent<ButtonParams> = ({ children, className, onKeyPress }) => (
  <div tabIndex={1} className={classNames('Button', className)} onKeyPress={onKeyPress}>
    {children}
  </div>
);