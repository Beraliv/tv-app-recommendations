import React, { FunctionComponent } from 'react';
import { PlayingStateContext, reducePlayingStateContext } from './PlayingStateContext';
import { reduceSourceContext, SourceContext } from './SourceContext';
import { VideoElementContext, reduceVideoElementContext } from './VideoElementContext';
import { ControlsSettingsContext, reduceControlsSettingsContext } from './ControlsSettingsContext';
import { reducePlayingPositionContext, PlayingPositionContext } from './PlayingPositionContext';
import { createContextReducer } from '../function/createContextReducer';
import { SelectionContext, reduceSelectionContext } from './SelectionContext';

export type ContextReducerParams = {
  /**
   * Video element singleton
   */
  videoElement: HTMLVideoElement;
}

const contextComposition: FunctionComponent<ContextReducerParams>[] = [
  props => <PlayingStateContext.Provider value={reducePlayingStateContext(props)} children={props.children} />,
  props => <SourceContext.Provider value={reduceSourceContext(props)} children={props.children} />,
  props => <VideoElementContext.Provider value={reduceVideoElementContext(props)} children={props.children} />,
  props => <ControlsSettingsContext.Provider value={reduceControlsSettingsContext(props)} children={props.children} />,
  props => <PlayingPositionContext.Provider value={reducePlayingPositionContext(props)} children={props.children} />,
  props => <SelectionContext.Provider value={reduceSelectionContext(props)} children={props.children} />,
];

export const ContextReducer = createContextReducer(contextComposition);
