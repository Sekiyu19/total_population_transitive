export type PopulationCompositionPerYear = {
  prefCode: string;
  boundaryYear: string;
  data: data[];
};

type data = {
  label: string;
  data: dataData[];
};

type dataData = {
  year: string;
  value: string;
};