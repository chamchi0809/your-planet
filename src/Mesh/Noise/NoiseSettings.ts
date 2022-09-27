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
    this.strength=1;
    this.numLayers=1;
    this.baseRoughness=1.5;
    this.roughness=2;
    this.persistence=.5;
    this.center=[0,0,0];
    this.minValue=0;
  }
}

export class RidgidNoiseSettings extends SimpleNoiseSettings{
  weightMultiplier:number;
  constructor(){
    super();
    this.weightMultiplier = .8;
  }
}