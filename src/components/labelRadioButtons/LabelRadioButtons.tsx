import React from 'react'
import { Data } from '../types/PopulationCompositionPerYear.tsx';

const LabelRadioButtons = ({ populationCompositionPerYear, label, setLabel }) => {

  const handleChange = (e: { target: { value: string; }; }) => setLabel(e.target.value);

  return (
    <div>
      {populationCompositionPerYear.data.map((data: Data) => (
        <label key={data.label}>
          <input
            type='radio'
            value={data.label}
            onChange={handleChange}
            checked={label == data.label}
          />
          {data.label}
        </label>
      ))}
    </div>
  )
}

export default LabelRadioButtons