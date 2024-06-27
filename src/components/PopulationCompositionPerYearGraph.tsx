import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { PopulationCompositionPerYear, data } from '../types/PopulationCompositionPerYear.tsx';

interface ChartData {
  year: string;
  [key: string]: string | number;
}

const createChartData = (populationCompositionPerYears: PopulationCompositionPerYear[]): ChartData[] => {
  const yearMap: { [key: string]: ChartData } = {};

  populationCompositionPerYears.forEach(populationCompositionPerYear => {
    populationCompositionPerYear.data.forEach(data => {
      data.data.forEach(dataData => {
        if (!yearMap[dataData.year]) {
          yearMap[dataData.year] = { year: dataData.year };
        }
        yearMap[dataData.year][`${populationCompositionPerYear.prefCode}-${data.label}`] = parseInt(dataData.value);
      });
    });
  });

  return Object.values(yearMap);
};

const PopulationCompositionPerYearGraph = ( {populationCompositionPerYears, prefectures} ) => {
  
  const chartData: ChartData[] = createChartData(populationCompositionPerYears);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {populationCompositionPerYears.flatMap((populationCompositionPerYear: { data: data[]; prefCode: string; }) =>
          populationCompositionPerYear.data.map((data: { label: string; }) => (
            <Line
              type="monotone"
              dataKey={`${populationCompositionPerYear.prefCode}-${data.label}`}
              name={prefectures[Number(populationCompositionPerYear.prefCode) - 1].prefName}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          ))
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PopulationCompositionPerYearGraph