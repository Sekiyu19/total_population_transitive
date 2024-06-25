import React from 'react'

const PrefectureCheckboxes = ({ prefectures, prefCodes, setPrefCodes }) => {

  const handleChange = (e) => {
    if (prefCodes.includes(e.target.value)) {
      setPrefCodes(prefCodes.filter((prefCode) => prefCode !== e.target.value));   
    } else {
      setPrefCodes([...prefCodes, e.target.value]);
    }
  };

  return (
    <div>
      {prefectures.map(prefecture => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            value={prefecture.prefCode}
            onChange={handleChange}
          />
          {prefecture.prefName}
        </div>
      ))}
    </div>
  )
}

export default PrefectureCheckboxes