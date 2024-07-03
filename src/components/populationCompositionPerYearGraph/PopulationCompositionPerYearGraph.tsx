import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Data } from '../../types/PopulationCompositionPerYear.tsx';
import './populationCompositionPerYearGraph.css';
import { generateRandomColor } from '../../util/ColorUtil.tsx';
import { ChartData, createChartData } from './CreateChartData.tsx';

const PopulationCompositionPerYearGraph = ({ populationCompositionPerYears, prefectures, label }) => {
  const chartData: ChartData[] = createChartData(populationCompositionPerYears);

  return (
    <div className="populationCompositionPerYearGraph">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 80,
            right: 100,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: '年度', position: 'insideRight', offset: -60 }} />
          <YAxis label={{ value: '人口数', position: 'insideTop', offset: -30 }} />
          <Tooltip />
          <Legend />
          {populationCompositionPerYears.flatMap(
            (populationCompositionPerYear: { data: Data[]; prefCode: string }) => (
              <Line
                type="natural"
                dataKey={`${populationCompositionPerYear.prefCode}-${label}`}
                name={prefectures[Number(populationCompositionPerYear.prefCode) - 1].prefName}
                stroke={generateRandomColor()}
                activeDot={{ r: 8 }}
              />
            )
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
    </div>
  );
};

export default PopulationCompositionPerYearGraph;
