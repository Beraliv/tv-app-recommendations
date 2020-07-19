import { createContext, useState, useContext, useEffect } from 'react';
import { noop } from '../function/noop';
import { ContextReducerParams } from './ContextReducer';

type ControlsVisibility = {
  Recommendations: false;
  Controls: true;
} | {
  Recommendations: true;
  Controls: false;
};

export type ControlsSettingsContextType = {
  /**
   * Visibility of all controls
   */
  visibility: ControlsVisibility;
  /**
   * Controls visibility trigger
   */
  setVisible: (element: keyof ControlsVisibility) => void;
}

const DEFAULT_CONTROLS_SETTINGS_CONTEXT: ControlsSettingsContextType = {
  visibility: {
    Recommendations: false,
    Controls: true,
  },
  setVisible: noop,
}

export const ControlsSettingsContext = createContext<ControlsSettingsContextType>(DEFAULT_CONTROLS_SETTINGS_CONTEXT);

export const reduceControlsSettingsContext = (props: ContextReducerParams): ControlsSettingsContextType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visibleControl, setVisibleControl] = useState<keyof ControlsVisibility>('Controls');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const up = (event: KeyboardEvent) => {
      if (event.keyCode !== 38) {
        return;
      }

      if (visibleControl === 'Recommendations') {
        setVisibleControl('Controls');
      }
    };

    window.addEventListener('keydown', up);

    return () => {
      window.removeEventListener('keydown', up);
    };
  }, [visibleControl]);
  
  if (visibleControl === 'Recommendations') {
    return {
      visibility: {
        Recommendations: true,
        Controls: false,
      },
      setVisible: setVisibleControl,
    };
  }

  return {
    visibility: {
      Recommendations: false,
      Controls: true,
    },
    setVisible: setVisibleControl,
  };
}

export const useControlsSettingsContext = () => useContext(ControlsSettingsContext);