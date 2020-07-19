import React from 'react';

export type UpArrowIconParams = {
  /**
   * Custom class name for outer styles
   */
  className?: string;
  /**
   * Color of the icon
   */
  color?: string;
};

export const UpArrowIcon = ({ className, color = '#FFF' }: UpArrowIconParams) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 40 40">
    <path
      fill={color}
      fillRule='evenodd'
      d="M 39.746094 28.953125 L 20.609375 9.816406 C 20.269531 9.476562 19.71875 9.476562 19.378906 9.816406 L 0.246094 28.953125 C -0.0898438 29.296875 -0.078125 29.847656 0.265625 30.183594 C 0.601562 30.507812 1.136719 30.507812 1.472656 30.183594 L 19.996094 11.664062 L 38.515625 30.183594 C 38.859375 30.519531 39.410156 30.507812 39.746094 30.164062 C 40.070312 29.824219 40.070312 29.292969 39.746094 28.953125 Z M 39.746094 28.953125"
    />
  </svg>
);