import React from 'react'
import { FilterType, NoiseSettings, RidgidNoiseSettings, SimpleNoiseSettings } from '../Mesh/Noise/NoiseSettings';
import { NoiseLayer } from '../Mesh/Noise/ShapeSettings'

interface NoiseLayerEditorProps{
  noiseLayer:NoiseLayer;
  setNoiseLayer:(noiseLayer:any)=>void;
}

function NoiseLayerEditor(props:NoiseLayerEditorProps) {

  const changeFilterType = (newFilterType:FilterType)=>{
    const newNoiseLayer = props.noiseLayer;
    newNoiseLayer.noiseSettings.filterType = newFilterType;
    props.setNoiseLayer(newNoiseLayer);
  }

  const changeNoiseSettings = (newNoiseSettings:NoiseSettings)=>{
    const newNoiseLayer = props.noiseLayer;
    newNoiseLayer.noiseSettings = newNoiseSettings;
    props.setNoiseLayer(newNoiseLayer);
  }

  function renderSimpleNoiseSettings(noiseSettings:SimpleNoiseSettings){
    
    const newNoiseSettings = props.noiseLayer.noiseSettings;
    return (
      <div className="noiseSettings">
        strength <input type="number" defaultValue={noiseSettings.strength} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.strength = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        numLayers <input type="number" defaultValue={noiseSettings.numLayers} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.numLayers = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        baseRoughness <input type="number" defaultValue={noiseSettings.baseRoughness} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.baseRoughness = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        roughness <input type="number" defaultValue={noiseSettings.roughness} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.roughness = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        persistence <input type="number" defaultValue={noiseSettings.persistence} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.persistence = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        center <input type="number" defaultValue={noiseSettings.center[0]} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.center[0] = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        minValue <input type="number" defaultValue={noiseSettings.minValue} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.minValue = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
      </div>
    )
  }

  return (
    <div className="noiseLayerEditor">
      <select name="" id="" value={props.noiseLayer.noiseSettings.filterType} onChange={(e)=>changeFilterType(e.target.value as unknown as FilterType)}>
        <option value={FilterType.Ridgid}>RidgidNoise</option>
        <option value={FilterType.Simple}>SimpleNoise</option>
      </select>
      {
        (function(){
          switch(props.noiseLayer.noiseSettings.filterType){
            case FilterType.Simple:
              return renderSimpleNoiseSettings(props.noiseLayer.noiseSettings.simpleNoiseSettings);
            case FilterType.Ridgid:
              return <></>
          }
        })()
        
      }
    </div>
  )
}

export default NoiseLayerEditor