import React from 'react'
import { FilterType, NoiseSettings, RidgidNoiseSettings, SimpleNoiseSettings } from '../Mesh/Noise/NoiseSettings';
import { NoiseLayer } from '../Mesh/Noise/ShapeSettings'
import Input from './UI/Input';
import Select from './UI/Select';

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
        <label htmlFor="strength">strength</label>
        <Input colors='darkgray' id='strength' type="number" defaultValue={noiseSettings.strength} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.strength = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="numLayers">numLayers</label>
        <Input colors='darkgray' id='numLayers' type="number" defaultValue={noiseSettings.numLayers} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.numLayers = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="baseRoughness">baseRoughness</label>
        <Input colors='darkgray' id='baseRoughness' type="number" defaultValue={noiseSettings.baseRoughness} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.baseRoughness = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="roughness">roughness</label>
        <Input colors='darkgray' id='roughness' type="number" defaultValue={noiseSettings.roughness} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.roughness = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="persistence">persistence</label>
        <Input colors='darkgray' id='persistence' type="number" defaultValue={noiseSettings.persistence} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.persistence = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <div className="offsetSettings">
          <label htmlFor="X">X</label>
          <Input colors='darkgray' id='X' type="number" defaultValue={noiseSettings.center[0]} onChange={(e)=>{
            newNoiseSettings.simpleNoiseSettings.center[0]= Number(e.target.value);
            changeNoiseSettings(newNoiseSettings)}
          }/>
          <label htmlFor="Y">Y</label>
          <Input colors='darkgray' id='Y' type="number" defaultValue={noiseSettings.center[1]} onChange={(e)=>{
            newNoiseSettings.simpleNoiseSettings.center[1]= Number(e.target.value);
            changeNoiseSettings(newNoiseSettings)}
          }/>
          <label htmlFor="Z">Z</label>
          <Input colors='darkgray' id='Z' type="number" defaultValue={noiseSettings.center[2]} onChange={(e)=>{
            newNoiseSettings.simpleNoiseSettings.center[2]= Number(e.target.value);
            changeNoiseSettings(newNoiseSettings)}
          }/>
        </div>
        <label htmlFor="minValue">minValue</label>
        <Input colors='darkgray' id='minValue' type="number" defaultValue={noiseSettings.minValue} onChange={(e)=>{
          newNoiseSettings.simpleNoiseSettings.minValue = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
      </div>
    )
  }

  function renderRidgidNoiseSettings(noiseSettings:RidgidNoiseSettings){
    
    const newNoiseSettings = props.noiseLayer.noiseSettings;
    return (
      <div className="noiseSettings">
        <label htmlFor="strength">strength</label>
        <Input colors='darkgray' id='strength' type="number" defaultValue={noiseSettings.strength} onChange={(e)=>{
          newNoiseSettings.ridgidNoiseSettings.strength = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="numLayers">numLayers</label>
        <Input colors='darkgray' id='numLayers' type="number" defaultValue={noiseSettings.numLayers} onChange={(e)=>{
          newNoiseSettings.ridgidNoiseSettings.numLayers = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="baseRoughness">baseRoughness</label>
        <Input colors='darkgray' id='baseRoughness' type="number" defaultValue={noiseSettings.baseRoughness} onChange={(e)=>{
          newNoiseSettings.ridgidNoiseSettings.baseRoughness = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="roughness">roughness</label>
        <Input colors='darkgray' id='roughness' type="number" defaultValue={noiseSettings.roughness} onChange={(e)=>{
          newNoiseSettings.ridgidNoiseSettings.roughness = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="persistence">persistence</label>
        <Input colors='darkgray' id='persistence' type="number" defaultValue={noiseSettings.persistence} onChange={(e)=>{
          newNoiseSettings.ridgidNoiseSettings.persistence = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <div className="offsetSettings">
          <label htmlFor="X">X</label>
          <Input colors='darkgray' id='X' type="number" defaultValue={noiseSettings.center[0]} onChange={(e)=>{
            newNoiseSettings.ridgidNoiseSettings.center[0]= Number(e.target.value);
            changeNoiseSettings(newNoiseSettings)}
          }/>
          <label htmlFor="Y">Y</label>
          <Input colors='darkgray' id='Y' type="number" defaultValue={noiseSettings.center[1]} onChange={(e)=>{
            newNoiseSettings.ridgidNoiseSettings.center[1]= Number(e.target.value);
            changeNoiseSettings(newNoiseSettings)}
          }/>
          <label htmlFor="Z">Z</label>
          <Input colors='darkgray' id='Z' type="number" defaultValue={noiseSettings.center[2]} onChange={(e)=>{
            newNoiseSettings.ridgidNoiseSettings.center[2]= Number(e.target.value);
            changeNoiseSettings(newNoiseSettings)}
          }/>
        </div>
        <label htmlFor="minValue">minValue</label>
        <Input colors='darkgray' id='minValue' type="number" defaultValue={noiseSettings.minValue} onChange={(e)=>{
          newNoiseSettings.ridgidNoiseSettings.minValue = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
        <label htmlFor="weightMultiplier">weightMultiplier</label>
        <Input colors='darkgray' id='weightMultiplier' type="number" defaultValue={noiseSettings.weightMultiplier} onChange={(e)=>{
          newNoiseSettings.ridgidNoiseSettings.weightMultiplier = Number(e.target.value);
          changeNoiseSettings(newNoiseSettings)}
        }/>
      </div>
    )
  }

  return (
    props.noiseLayer ?
    <div className="noiseLayerEditor">
      <Select colors='darkgray' name="" id="" value={props.noiseLayer.noiseSettings?.filterType} onChange={(e)=>changeFilterType(e.target.value as unknown as FilterType)}>
        <option value={FilterType.Ridgid}>RidgidNoise</option>
        <option value={FilterType.Simple}>SimpleNoise</option>
      </Select>
      <br/>
      <label htmlFor="enabled">enabled</label>
      <Input colors='darkgray' id='enabled' type="checkbox" defaultChecked={props.noiseLayer.enabled} onChange={(e)=>{
        props.noiseLayer.enabled=e.target.checked;
        props.setNoiseLayer(props.noiseLayer);
      }}/>
      <br/>
      <label htmlFor="useFirstLayerAsMask">useFirstLayerAsMask</label>
      <Input colors='darkgray' id='useFirstLayerAsMask' type="checkbox" defaultChecked={props.noiseLayer.useFirstLayerAsMask} onChange={(e)=>{
        props.noiseLayer.useFirstLayerAsMask=e.target.checked;
        props.setNoiseLayer(props.noiseLayer);
      }}/>
      {
        (function(){
          switch(props.noiseLayer.noiseSettings?.filterType){
            case FilterType.Simple:
              return renderSimpleNoiseSettings(props.noiseLayer?.noiseSettings?.simpleNoiseSettings);
            case FilterType.Ridgid:
              return renderRidgidNoiseSettings(props.noiseLayer?.noiseSettings?.ridgidNoiseSettings)
          }
        })()
        
      }
    </div>
    :
    <></>
  )
}

export default NoiseLayerEditor