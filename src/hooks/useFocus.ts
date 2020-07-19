import { useEffect, useState } from "react"

export type FocusParams = {
  /**
   * Keyboard focused card index
   */
  keyboardFocusIndex: number;
  /**
   * Expected next keyboard focused card index
   * 
   * 🔥 It's applied to scrollIntoView for smooth animation
   */
  expectedNextKeyboardFocusIndex: number;
}

export const useFocus = (recommendations: number): FocusParams => {
  const [keyboardFocus, setKeyboardFocused] = useState({
    current: 0,
    expected: 0,
  });

  useEffect(() => {
    const left = () => {
      setKeyboardFocused(({ current }) => {
        const nextCurrent = Math.max(
          current - 1,
          0,
        );
        const nextExpected = Math.max(
          nextCurrent - 1,
          0,
        );

        return {
          current: nextCurrent,
          expected: nextExpected,
        };
      });
    };

    const right = () => {
      setKeyboardFocused(({ current }) => {
        const nextCurrent = Math.min(
          current + 1,
          recommendations - 1,
        );
        const nextExpected = Math.min(
          nextCurrent + 1,
          recommendations - 1,
        );

        return {
          current: nextCurrent,
          expected: nextExpected,
        };
      });
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.keyCode === 37) {
        left();
        return;
      }

      if (event.keyCode === 39) {
        right();
        return;
      }
    }
    
    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    }
  }, [recommendations]);

  return {
    keyboardFocusIndex: keyboardFocus.current,
    expectedNextKeyboardFocusIndex: keyboardFocus.expected,
  };
};