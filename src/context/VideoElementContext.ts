import { createContext, useContext } from 'react';
import { ContextReducerParams } from './ContextReducer';

export type VideoElementContextType = {
  videoElement: HTMLVideoElement;
};

const VIDEO_TAG_PLACE_CONTEXT_CONTEXT: VideoElementContextType = {
  videoElement: document.getElementById('video')! as HTMLVideoElement,
}

export const VideoElementContext = createContext<VideoElementContextType>(VIDEO_TAG_PLACE_CONTEXT_CONTEXT);

export const reduceVideoElementContext = ({ videoElement }: ContextReducerParams) => {
  return { videoElement };
}

export const useVideoElementContext = () => useContext(VideoElementContext);