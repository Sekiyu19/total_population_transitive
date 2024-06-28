import { Data } from '../../types/PopulationCompositionPerYear.tsx';
import './labelRadioButtons.css';

const LabelRadioButtons = ({ populationCompositionPerYear, label, setLabel }) => {
  const handleChange = (e: { target: { value: string } }) => setLabel(e.target.value);

  const labels: string[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

  function LabelRadioButtonsIfPopulationCompositionPerYearExist() {
    if (populationCompositionPerYear != null) {
      return populationCompositionPerYear.data.map((data: Data) => (
        <label key={data.label}>
          <input type="radio" value={data.label} onChange={handleChange} checked={label == data.label} />
          {data.label}
        </label>
      ));
    }
    return labels.map((lab: string) => (
      <label key={lab}>
        <input type="radio" value={lab} onChange={handleChange} checked={label == lab} />
        {lab}
      </label>
    ));
  }

  return (
    <div className="labelRadioButtons">
      <h2>区分</h2>
      <LabelRadioButtonsIfPopulationCompositionPerYearExist />
    </div>
  );
};

export default LabelRadioButtons;
