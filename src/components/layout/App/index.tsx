import React from 'react';
import assets from '../../../data/assets.json';
import './index.css';
import { RecommendationLane } from '../../organisms/RecommendationLane';
import { AssetType } from '../../../types/AssetType';

type StateType = {
  index: number;
  assets: AssetType[];
};

type PropsType = {};

export class App extends React.PureComponent<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      index: 0,
      assets: assets as AssetType[],
    };
  }

  render() {
    const { index, assets } = this.state;

    return (
      <div className="app">
        <video src={assets[0].video}></video>
        Horizontal Index: {index}
        <RecommendationLane />
      </div>
    );
  }
}
