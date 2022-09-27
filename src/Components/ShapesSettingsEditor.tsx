import React from 'react'
import { NoiseLayer, ShapeSettings } from '../Mesh/Noise/ShapeSettings'
import NoiseLayerEditor from './NoiseLayerEditor';

interface ShapesSettingsEditorProps{
  shapeSettings:ShapeSettings;
  setShapeSettings
}

function ShapesSettingsEditor(props:ShapesSettingsEditorProps) {
  
  return (
    <div className='shapeSettingsEditor'>
      planetRadius: <input type={'range'} value={props.shapeSettings.planetRadius} min='.1' max='5' step={.01}
      onChange={(e)=>{
        props.setShapeSettings({...props.shapeSettings,planetRadius:Number(e.target.value)});
      }}
      />
      
      {
        props.shapeSettings.noiseLayers.map((noiseLayer,i)=>{
          return(
            <NoiseLayerEditor noiseLayer={noiseLayer} key={i}
            setNoiseLayer={(newNoiseLayer:NoiseLayer)=>{
              props.shapeSettings.noiseLayers[i] = newNoiseLayer;
              props.setShapeSettings({...props.shapeSettings});
            }}
            />
          )
        })
      }
    </div>
  )
}

export default ShapesSettingsEditor