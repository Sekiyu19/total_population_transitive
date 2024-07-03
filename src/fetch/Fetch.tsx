import axios from 'axios';
import Resas from '../Resas/Resas.tsx';
import { Prefecture } from '../types/Prefecture.tsx';
import { PopulationCompositionPerYear } from '../types/PopulationCompositionPerYear.tsx';

export async function fetchPrefectures(): Promise<Prefecture[]> {
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

export async function fetchPopulationCompositionPerYear(prefCode: string): Promise<PopulationCompositionPerYear> {
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

export async function fetchPopulationCompositionPerYears(prefCodes): Promise<PopulationCompositionPerYear[]> {
  try {
    const promises = prefCodes.map((prefCode) => fetchPopulationCompositionPerYear(prefCode));
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