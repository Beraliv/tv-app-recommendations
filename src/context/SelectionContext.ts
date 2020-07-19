import { createContext, useState, useContext } from 'react';
import { noop } from '../function/noop';
import { ContextReducerParams } from './ContextReducer';

export type SelectionContextType = {
  /**
   * Current selection
   */
  currentSelection: number;
  /**
   * Next selection
   */
  nextSelection: number;
  /**
   * Select left element
   */
  left: () => void;
  /**
   * Select right element
   */
  right: (length: number) => void;
};

const DEFAULT_SOURCE_CONTEXT: SelectionContextType = {
  currentSelection: 0,
  nextSelection: 1,
  left: noop,
  right: noop,
}

export const SelectionContext = createContext<SelectionContextType>(DEFAULT_SOURCE_CONTEXT);

export const reduceSelectionContext = ({ videoElement }: ContextReducerParams) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selection, setSelection] = useState({
    current: DEFAULT_SOURCE_CONTEXT.currentSelection,
    next: DEFAULT_SOURCE_CONTEXT.nextSelection,
  });

  const left = () => {
    setSelection(({ current: previous }) => {
      const current = Math.max(
        previous - 1,
        0,
      );
      const next = Math.max(
        current - 1,
        0,
      );

      return {
        current,
        next,
      };
    });
  };

  const right = (length: number) => {
    setSelection(({ current: previous }) => {
      const current = Math.min(
        previous + 1,
        length - 1,
      );
      const next = Math.min(
        current + 1,
        length - 1,
      );

      return {
        current,
        next,
      };
    });
  };

  return {
    currentSelection: selection.current,
    nextSelection: selection.next,
    left,
    right,
  }
}

export const useSelectionContext = () => useContext(SelectionContext);