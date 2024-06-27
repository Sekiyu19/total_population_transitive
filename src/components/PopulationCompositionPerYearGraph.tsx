import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { PopulationCompositionPerYear, Data } from '../types/PopulationCompositionPerYear.tsx';

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

const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PopulationCompositionPerYearGraph = ( {populationCompositionPerYears, prefectures, label} ) => {
  
  const chartData: ChartData[] = createChartData(populationCompositionPerYears);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 50, right: 70, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" label={{ value: '年度', position: 'insideRight', offset: -60 }}/>
        <YAxis label={{ value: '人口数', position: 'insideTop', offset: -30 }} />
        <Tooltip />
        <Legend />
        {populationCompositionPerYears.flatMap((populationCompositionPerYear: { data: Data[]; prefCode: string; }) =>
          <Line
            type="natural"
            dataKey={`${populationCompositionPerYear.prefCode}-${label}`}
            name={prefectures[Number(populationCompositionPerYear.prefCode) - 1].prefName}
            stroke={generateRandomColor()}
            activeDot={{ r: 8 }}
          />
          // populationCompositionPerYear.data.map((data: { label: string; }) => (
          //   <Line
          //     type="monotone"
          //     dataKey={`${populationCompositionPerYear.prefCode}-${data.label}`}
          //     name={`${prefectures[Number(populationCompositionPerYear.prefCode) - 1].prefName}-${data.label}`}
          //     stroke={generateRandomColor()}
          //     activeDot={{ r: 8 }}
          //   />
          // ))
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PopulationCompositionPerYearGraph