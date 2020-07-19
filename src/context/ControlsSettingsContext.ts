import { createContext, useState, useContext } from 'react';
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

const CONTROLS_SETTINGS_CONTEXT_CONTEXT: ControlsSettingsContextType = {
  visibility: {
    Recommendations: false,
    Controls: true,
  },
  setVisible: noop,
}

export const ControlsSettingsContext = createContext<ControlsSettingsContextType>(CONTROLS_SETTINGS_CONTEXT_CONTEXT);

export const reduceControlsSettingsContext = (props: ContextReducerParams): ControlsSettingsContextType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visibleControl, setVisibleControl] = useState<keyof ControlsVisibility>('Controls');
  
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