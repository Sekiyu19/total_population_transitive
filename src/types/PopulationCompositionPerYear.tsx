export type PopulationCompositionPerYear = {
  prefCode: string;
  boundaryYear: string;
  data: Data[];
};

export type Data = {
  label: string;
  data: DataData[];
};

export type DataData = {
  year: string;
  value: string;
};
