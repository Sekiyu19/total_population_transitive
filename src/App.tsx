import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Resas from './Resas/Resas.tsx';
import { Prefecture } from './types/Prefecture.tsx';
import PrefectureCheckboxes from './components/PrefectureCheckboxes.jsx';

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

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

  return (
    <div className="App">
      <header className="App-header">
        都道府県別の総人口推移
      </header>
      <body className="App-body">
        <PrefectureCheckboxes prefectures={prefectures} />
      </body>
    </div>
  );
}

export default App;
