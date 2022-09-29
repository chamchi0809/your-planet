import { Vec3 } from '../../vector';

export enum FilterType{
  Simple='Simple',
  Ridgid='Ridgid'
}

export class NoiseSettings{
  filterType:FilterType;

  simpleNoiseSettings:SimpleNoiseSettings;
  ridgidNoiseSettings:RidgidNoiseSettings;

  constructor(){
    this.filterType = FilterType.Simple;
    this.simpleNoiseSettings = new SimpleNoiseSettings();
    this.ridgidNoiseSettings = new RidgidNoiseSettings();
  }
}

export class SimpleNoiseSettings
{
  strength:number;
  numLayers:number;
  baseRoughness:number;
  roughness:number;
  persistence:number;
  center:Vec3;
  minValue:number;

  constructor(){
    this.strength=0.2;
    this.numLayers=3;
    this.baseRoughness=1;
    this.roughness=2.5;
    this.persistence=.3;
    this.center=[0,0,0];
    this.minValue=0.7;
  }
}

export class RidgidNoiseSettings extends SimpleNoiseSettings{
  weightMultiplier:number;
  constructor(){
    super();
    this.weightMultiplier = .8;
  }
}