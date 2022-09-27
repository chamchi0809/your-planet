import { NoiseSettings } from './NoiseSettings';

export class ShapeSettings{
  planetRadius:number;
  noiseLayers:NoiseLayer[];

  constructor(){
    this.planetRadius = 1;
    this.noiseLayers=[new NoiseLayer()];
  }
}

export class NoiseLayer{
  enabled:boolean;
  useFirstLayerAsMask:boolean;
  noiseSettings:NoiseSettings ;

  constructor(){
    this.enabled=true;
    this.useFirstLayerAsMask=false;
    this.noiseSettings = new NoiseSettings();
  }
}