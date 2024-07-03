import { PopulationCompositionPerYear } from '../../types/PopulationCompositionPerYear.tsx';

export interface ChartData {
  year: string;
  [key: string]: string | number;
}

export const createChartData = (populationCompositionPerYears: PopulationCompositionPerYear[]): ChartData[] => {
  const yearMap: { [key: string]: ChartData } = {};

  populationCompositionPerYears.forEach((populationCompositionPerYear) => {
    populationCompositionPerYear.data.forEach((data) => {
      data.data.forEach((dataData) => {
        if (!yearMap[dataData.year]) {
          yearMap[dataData.year] = { year: dataData.year };
        }
        yearMap[dataData.year][`${populationCompositionPerYear.prefCode}-${data.label}`] = parseInt(dataData.value);
      });
    });
  });

  return Object.values(yearMap);
};