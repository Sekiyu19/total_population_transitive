export type PopulationCompositionPerYear = {
  prefCode: string;
  boundaryYear: string;
  data: data[];
};

export type data = {
  label: string;
  data: dataData[];
};

export type dataData = {
  year: string;
  value: string;
};