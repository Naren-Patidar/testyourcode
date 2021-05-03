import { useSelector } from 'react-redux';
import { selectProceduralElements } from '+store/workInstruction/selector';
import './EWIProElements.scss';

const EWIProElements: React.FC = () => {
  const proceduralItems = useSelector(selectProceduralElements);
  return (
    <div className="procedural-list">
      {proceduralItems?.map((element) => (
        <span>{element}</span>
      ))}
    </div>
  );
};

export default EWIProElements;
