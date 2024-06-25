import React from 'react'

const PrefectureCheckboxes = ({ prefectures }) => {
  return (
    <div>
      {prefectures.map(prefecture => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            value={prefecture.prefCode}
          />
          {prefecture.prefName}
        </div>
      ))}
    </div>
  )
}

export default PrefectureCheckboxes