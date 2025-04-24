import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectItem} from '../ui/select';
import { SelectContent } from '@radix-ui/react-select';

function CommonForm({formControls, onSubmit, formData, setFormData, buttonText}) {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || '';
    switch(getControlItem.componentType){
      case 'input' : 
      element = (
        <Input name={getControlItem.name}  type={getControlItem.type} value={value} onChange={(event) =>
          setFormData({
            ...formData, [getControlItem.name] :event.target.value,
          })}
          
          /> 
      )
      break;

      case 'select': 
      element = (
        <Select>
          <SelectContent>
           {getControlItem.options?.map((option) => (
            <SelectItem key={option.id} value={option.key}> {option.label} </SelectItem>
           ))}
          </SelectContent>
        </Select>
      )
      break;

      case 'textarea': 
      element = ( 
        <Textarea name={getControlItem.name} type={getControlItem.type} >{getControlItem.placeholder}</Textarea>
      )
      break;

      default : 
      element = (
        <Input name={getControlItem.name} type={getControlItem.type} value={value} onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})} />
      )
      break;
    } 

    return element; 
  }

  
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className='w-full gap-1.5'>
            <Label className='mb-2'> {controlItem.label} </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}

        <Button type='submit' className='mt-2 cursor-pointer'> {buttonText || 'Submit'} </Button>
      </div>
    </form>
  )
}

export default CommonForm