export type RemainingTimeParams = {
  /**
   * Current video time
   */
  currentTime: number;
  /**
   * Video duration
   */
  duration: number;
}

const SECS_IN_MIN = 60;

export const getRemainingTimeString = ({
  currentTime,
  duration,
}: RemainingTimeParams): string => {
  const remainingTimeInSecs = duration - currentTime;

  const remainingTimeMinsOnly = Math.floor(remainingTimeInSecs / SECS_IN_MIN);
  const remainingTimeSecsOnly = Math.floor(remainingTimeInSecs - remainingTimeMinsOnly * SECS_IN_MIN);

  const remainingTimeMinsOnlyString = `${remainingTimeMinsOnly}`.padStart(2, '0');
  const remainingTimeSecsOnlyString = `${remainingTimeSecsOnly}`.padStart(2, '0');

  return `${remainingTimeMinsOnlyString}:${remainingTimeSecsOnlyString}`;
};