import { createContext, useState, useContext, useEffect } from 'react';
import { noop } from '../function/noop';
import { ContextReducerParams } from './ContextReducer';
import { AssetType } from '../types/AssetType';
import assets from '../data/assets.json';

export type SourceContextType = {
  /**
   * Current source
   */
  currentSource: AssetType;
  /**
   * Sources except for current source
   */
  otherSources: AssetType[];
  /**
   * Set source trigger
   */
  setSource: (next: AssetType['id']) => void;
};

const DEFAULT_SOURCE_CONTEXT: SourceContextType = {
  currentSource: assets[0],
  otherSources: (assets as AssetType[]).slice(1),
  setSource: noop,
}

export const SourceContext = createContext<SourceContextType>(DEFAULT_SOURCE_CONTEXT);

export const reduceSourceContext = ({ videoElement }: ContextReducerParams) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentSource, setCurrentSource] = useState(DEFAULT_SOURCE_CONTEXT.currentSource);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [otherSources, setOtherSources] = useState(DEFAULT_SOURCE_CONTEXT.otherSources);

  const splitCurrentAndOthers = (nextId: AssetType['id']): [AssetType | undefined, AssetType[]] => {
    let currentSource: AssetType | undefined;
    const otherSources: AssetType[] = [];

    for (let source of (assets as AssetType[])) {
      if (source.id === nextId) {
        currentSource = source;
      } else {
        otherSources.push(source);
      }
    }

    return [currentSource, otherSources];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    videoElement.src = currentSource.video;

    videoElement.load();
  }, [currentSource, videoElement]);

  const setSource = (nextId: AssetType['id']) => {
    const [nextSource, nextOtherSources] = splitCurrentAndOthers(nextId);

    videoElement.autoplay = true;

    if (nextSource) {
      setCurrentSource(nextSource);
      setOtherSources(nextOtherSources);
    }
  };

  return {
    currentSource,
    otherSources,
    setSource,
  }
}

export const useSourceContext = () => useContext(SourceContext);