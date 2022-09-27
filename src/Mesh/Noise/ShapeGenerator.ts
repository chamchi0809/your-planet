import { multiplyByScalar } from '../../vector';
import { MinMax } from '../MinMax';
import { ANoiseFilter, CreateNoiseFilter } from './NoiseFilter';
import { ShapeSettings } from './ShapeSettings';

export class ShapeGenerator{
  settings:ShapeSettings;
  noiseFilters:ANoiseFilter[];
  minmax:MinMax=new MinMax();
  seed:number;

  constructor(settings:ShapeSettings){
    this.OnNoiseSettingsChange(settings);
    this.seed=20000;
  }

  OnNoiseSettingsChange(settings:ShapeSettings){
    this.settings = settings;
    this.noiseFilters = [];

    for(let i = 0; i < settings.noiseLayers.length; i++){
      this.noiseFilters.push(CreateNoiseFilter(settings.noiseLayers[i].noiseSettings, this.seed));
    }
  }

  CalcPointOnPlanet(pointOnUnitSphere:number[]){

    let firstLayerValue = 0;
    let elevation = 0;

    if(this.noiseFilters.length > 0){
      firstLayerValue = this.noiseFilters[0].Evaluate(pointOnUnitSphere);
      if(this.settings.noiseLayers[0].enabled){
        elevation = firstLayerValue;
      }
    }

    for(let i = 1; i < this.noiseFilters.length; i++){
      if(this.settings.noiseLayers[i].enabled){
        const mask = (this.settings.noiseLayers[i].useFirstLayerAsMask) ? firstLayerValue : 1;
        elevation += this.noiseFilters[i].Evaluate(pointOnUnitSphere) * mask;
      }
    }
    elevation = this.settings.planetRadius * (1+elevation);
    this.minmax.AddValue(elevation);
    return multiplyByScalar(pointOnUnitSphere, elevation);
  }
}