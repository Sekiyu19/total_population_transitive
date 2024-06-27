import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Resas from './Resas/Resas.tsx';
import { Prefecture } from './types/Prefecture.tsx';
import { PopulationCompositionPerYear } from './types/PopulationCompositionPerYear.tsx';
import PrefectureCheckboxes from './components/PrefectureCheckboxes.jsx';
import PopulationCompositionPerYearGraph from './components/PopulationCompositionPerYearGraph.tsx';

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [prefCodes, setPrefCodes] = useState<string[]>([]);
  const [populationCompositionPerYears, setPopulationCompositionPerYears] = useState<PopulationCompositionPerYear[]>([]);

  useEffect(() => {
    async function fetchPrefectures(): Promise<Prefecture[]> {
      try {
        const response = await axios.get(`${Resas.API_ENDPOINT}/prefectures`, {
          headers: {
            'X-API-KEY': Resas.API_KEY,
          },
        });
        if (response.data && response.data.result) {
          return response.data.result as Prefecture[];
        } else {
          throw new Error('Failed to fetch prefectures data');
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

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
    async function fetchPopulationCompositionPerYear(prefCode: string): Promise<PopulationCompositionPerYear> {
      try {
        const response = await axios.get(`${Resas.API_ENDPOINT}/population/composition/perYear?cityCode=-&prefCode=${prefCode}`, {
          headers: {
            'X-API-KEY': Resas.API_KEY,
          },
        });
        if (response.data && response.data.result) {
          return {
            prefCode: prefCode,
            boundaryYear: response.data.result.boundaryYear,
            data: response.data.result.data,
          };
        } else {
          throw new Error('Failed to fetch populationCompositionPerYear data');
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async function fetchPopulationCompositionPerYears(): Promise<PopulationCompositionPerYear[]> {
      try {
        const promises = prefCodes.map(prefCode => fetchPopulationCompositionPerYear(prefCode));
        const response = await Promise.all(promises);
        if (response) {
          return response as PopulationCompositionPerYear[];
        } else {
          throw new Error('Failed to fetch populationCompositionPerYears data');
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    fetchPopulationCompositionPerYears()
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
        都道府県別の総人口推移
      </header>
      <body className="App-body">
        <PrefectureCheckboxes prefectures={prefectures} prefCodes={prefCodes} setPrefCodes={setPrefCodes} />
        <PopulationCompositionPerYearGraph populationCompositionPerYears={populationCompositionPerYears} prefectures={prefectures} />
      </body>
    </div>
  );
}

export default App;
