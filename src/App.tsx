import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { fetchPrefectures, fetchPopulationCompositionPerYears } from './fetch/Fetch.tsx';
import { Prefecture } from './types/Prefecture.tsx';
import { PopulationCompositionPerYear } from './types/PopulationCompositionPerYear.tsx';
import PrefectureCheckboxes from './components/prefectureCheckboxes/PrefectureCheckboxes.tsx';
import LabelRadioButtons from './components/labelRadioButtons/LabelRadioButtons.tsx';
import PopulationCompositionPerYearGraph from './components/populationCompositionPerYearGraph/PopulationCompositionPerYearGraph.tsx';

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [prefCodes, setPrefCodes] = useState<string[]>([]);
  const [label, setLabel] = useState<string>('総人口');
  const [populationCompositionPerYears, setPopulationCompositionPerYears] = useState<PopulationCompositionPerYear[]>([]);

  useEffect(() => {
    fetchPrefectures()
      .then((prefectures) => {
        console.log('Prefectures:', prefectures);
        setPrefectures(prefectures);
      })
      .catch((error) => {
        console.error('Error fetching prefectures:', error);
      });
  }, []);

  useEffect(() => {
    fetchPopulationCompositionPerYears(prefCodes)
      .then((populationCompositionPerYears) => {
        console.log('PopulationCompositionPerYears:', populationCompositionPerYears);
        setPopulationCompositionPerYears(populationCompositionPerYears);
      })
      .catch((error) => {
        console.error('Error fetching populationCompositionPerYears:', error);
      });
  }, [prefCodes]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>都道府県別の総人口推移</h1>
      </header>
      <body className="App-body">
        <PrefectureCheckboxes prefectures={prefectures} prefCodes={prefCodes} setPrefCodes={setPrefCodes} />
        <LabelRadioButtons populationCompositionPerYear={populationCompositionPerYears[0]} label={label} setLabel={setLabel} />
        <PopulationCompositionPerYearGraph populationCompositionPerYears={populationCompositionPerYears} prefectures={prefectures} label={label} />
      </body>
    </div>
  );
}

export default App;
