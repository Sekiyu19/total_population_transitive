import { Prefecture } from '../../types/Prefecture.tsx';
import './prefectureCheckboxes.css';

const PrefectureCheckboxes = ({ prefectures, prefCodes, setPrefCodes }) => {
  const handleChange = (e: { target: { value: string } }) => {
    if (prefCodes.includes(e.target.value)) {
      setPrefCodes(prefCodes.filter((prefCode: string) => prefCode !== e.target.value));
    } else {
      setPrefCodes([...prefCodes, e.target.value]);
    }
  };

  return (
    <div className="prefectureCheckboxes">
      <h2>都道府県</h2>
      {prefectures.map((prefecture: Prefecture) => (
        <label className="prefectureCheckbox" key={prefecture.prefCode}>
          <input type="checkbox" value={prefecture.prefCode} onChange={handleChange} />
          {prefecture.prefName}
        </label>
      ))}
    </div>
  );
};

export default PrefectureCheckboxes;
