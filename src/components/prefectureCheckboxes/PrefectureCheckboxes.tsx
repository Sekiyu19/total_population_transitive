import React from 'react'
import { Prefecture } from '../types/Prefecture.tsx';

const PrefectureCheckboxes = ({ prefectures, prefCodes, setPrefCodes }) => {

  const handleChange = (e: { target: { value: string; }; }) => {
    if (prefCodes.includes(e.target.value)) {
      setPrefCodes(prefCodes.filter((prefCode: string) => prefCode !== e.target.value));
    } else {
      setPrefCodes([...prefCodes, e.target.value]);
    }
  };

  return (
    <div>
      {prefectures.map((prefecture: Prefecture) => (
        <label key={prefecture.prefCode}>
          <input
            type='checkbox'
            value={prefecture.prefCode}
            onChange={handleChange}
          />
          {prefecture.prefName}
        </label>
      ))}
    </div>
  )
}

export default PrefectureCheckboxes