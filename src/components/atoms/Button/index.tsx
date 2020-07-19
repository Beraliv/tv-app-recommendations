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
  /**
   * Element tab index
   */
  tabIndex?: number;
};

export const Button: FunctionComponent<ButtonParams> = ({
  children,
  className,
  onKeyPress,
  tabIndex,
}) => (
  <div
    className={classNames('Button', className)}
    onKeyPress={onKeyPress}
    tabIndex={tabIndex}
  >
    {children}
  </div>
);