import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { clamp } from "./clamp";
import './index.css';

export type TimelineBarParams = {
  /**
   * Custom class name for outer styles
   */
  className?: string;
  /**
   * Current video time
   */
  currentTime: number;
  /**
   * Video duration
   */
  duration: number;
}

export const TimelineBar: FunctionComponent<TimelineBarParams> = ({
  currentTime,
  duration,
  className,
}) => {
  const currentTimeRatio = clamp(duration === 0 ? 0 : currentTime / duration, 0, 1);

  const progressColor = '#ddd';
  const backgroundColor = '#555';

  return (
    <div className={classNames('TimelineBar__container', className)}>
      <input
        className='TimelineBar'
        type='range'
        max='100'
        step='1'
        value={100 * currentTimeRatio}
        style={{
          background: `
            linear-gradient(
              to right,
              ${progressColor} 0%,
              ${progressColor} ${currentTimeRatio * 100}%,
              ${backgroundColor} ${currentTimeRatio * 100}%,
              ${backgroundColor} 100%
            )`
        }}
        readOnly={true}
      />
    </div>
  );
};