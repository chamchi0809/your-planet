import { FilterType, NoiseSettings, RidgidNoiseSettings, SimpleNoiseSettings } from './NoiseSettings';
import {createNoise3D, NoiseFunction3D} from 'simplex-noise'
import { addVector, multiplyByScalar } from '../../vector';
import { Clamp01 } from '../../mathHelper';
import Alea from 'alea';

export abstract class ANoiseFilter{
  abstract Evaluate(point:number[]):number;
}

export const CreateNoiseFilter=(settings:NoiseSettings, seed:number=20000)=>{

  switch(settings.filterType){
    case FilterType.Simple:
      return new SimpleNoiseFilter(settings.simpleNoiseSettings, seed);
    case FilterType.Ridgid:
      return new RidgidNoiseFilter(settings.ridgidNoiseSettings, seed);
  }
}

export class SimpleNoiseFilter extends ANoiseFilter{

  settings:SimpleNoiseSettings;
  noise:NoiseFunction3D;

  constructor(settings:SimpleNoiseSettings, seed:number){
    super();
    this.settings = settings;
    this.noise = createNoise3D(Alea(seed));
  }

  Evaluate(point: number[]): number {
    let noiseValue = 0;
    let frequency = this.settings.baseRoughness;
    let amplitude = 1;

    for(let i = 0; i < this.settings.numLayers; i++){
      const noisePoint = addVector(multiplyByScalar(point, frequency),this.settings.center);
      const v = this.noise(noisePoint[0], noisePoint[1], noisePoint[2]);
      noiseValue += (v+1) * .5 * amplitude;
      frequency *= this.settings.roughness;
      amplitude *= this.settings.persistence;
    }

    noiseValue = Math.max(0, noiseValue - this.settings.minValue);
    return noiseValue * this.settings.strength;
  }
}

export class RidgidNoiseFilter extends ANoiseFilter{

  settings:RidgidNoiseSettings;
  noise:NoiseFunction3D;

  constructor(settings:RidgidNoiseSettings, seed:number){
    super();
    this.settings = settings;
    this.noise=createNoise3D();

  }

  Evaluate(point: number[]): number {
    let noiseValue = 0;
    let frequency = this.settings.baseRoughness;
    let amplitude = 1;
    let weight = 1;

    for(let i = 0; i < this.settings.numLayers; i++){
      const noisePoint = addVector(multiplyByScalar(point, frequency), this.settings.center);
      let v = 1-Math.abs(this.noise(noisePoint[0], noisePoint[1], noisePoint[2]));
      v *= v;
      v *= weight;
      weight = Clamp01(v * this.settings.weightMultiplier);

      noiseValue += v * amplitude;
      frequency *= this.settings.roughness;
      amplitude *= this.settings.persistence;
    }

    noiseValue = Math.max(0, noiseValue - this.settings.minValue);
    return noiseValue * this.settings.strength;
  }
}