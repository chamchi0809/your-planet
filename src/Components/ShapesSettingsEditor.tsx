import React,{useState, Dispatch, SetStateAction} from 'react'
import { MdAdd, MdDelete } from 'react-icons/md';
import { NoiseLayer, ShapeSettings } from '../Mesh/Noise/ShapeSettings'
import NoiseLayerEditor from './NoiseLayerEditor';
import Button from './UI/Button';
import Select from './UI/Select';

interface ShapesSettingsEditorProps{
  shapeSettings:ShapeSettings;
  setShapeSettings:Dispatch<SetStateAction<ShapeSettings>>
}

function ShapesSettingsEditor(props:ShapesSettingsEditorProps) {
  
  const [selectedLayer, setSelectedLayer] = useState(0);

  const addLayer = ()=>{
    props.setShapeSettings(prevSettings=>{
      prevSettings.noiseLayers.push(new NoiseLayer());
      return {...prevSettings};
    })
  }

  const deleteLayer = ()=>{
    if(props.shapeSettings.noiseLayers.length === 1) return;
    setSelectedLayer(0);
    props.setShapeSettings(prevSettings=>{
      prevSettings.noiseLayers= prevSettings.noiseLayers.filter((layer,i)=>i!==selectedLayer);
      return {...prevSettings};
    })
  }

  return (
    <div className='shapeSettingsEditor'>

      <Select colors='darkgray' name="" id="" value={selectedLayer} onChange={(e)=>setSelectedLayer(Number(e.target.value))}>
        {
          props.shapeSettings.noiseLayers.map((noiseLayer,i)=>{
            return(
              <option key={i} value={i}>{i} : {noiseLayer.noiseSettings?.filterType}</option>
            )
          })
        }
      </Select>
      <Button colors='darkgray' onClick={addLayer}><MdAdd/></Button>
      <Button colors='red' onClick={deleteLayer}><MdDelete/></Button>
      {
        <NoiseLayerEditor noiseLayer={props.shapeSettings.noiseLayers[selectedLayer]}
        setNoiseLayer={(newNoiseLayer:NoiseLayer)=>{
          props.shapeSettings.noiseLayers[selectedLayer] = newNoiseLayer;
          props.setShapeSettings({...props.shapeSettings});
        }}
        />
      }
    </div>
  )
}

export default ShapesSettingsEditor