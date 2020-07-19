import classNames from "classnames";
import React from 'react';

export type LabelParams = {
  /**
   * Custom class name for outer styles
   */
  className?: string;
  /**
   * Text for the label
   */
  text: string;
};

export const Label = ({ className, text }: LabelParams) => (
  <div className={classNames('Label', className)}>
    {text}
  </div>
);