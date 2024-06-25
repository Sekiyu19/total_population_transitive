import React from 'react'

const PopulationCompositionPerYearGraph = ({ populationCompositionPerYears }) => {
  return (
    <div>
      {populationCompositionPerYears.map(populationCompositionPerYear => (
        <div>
          {populationCompositionPerYear.prefCode}
        </div>
      ))}
    </div>
  )
}

export default PopulationCompositionPerYearGraph