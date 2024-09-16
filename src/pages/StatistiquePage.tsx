import './style/StatistiquePage.css';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import BusChart from '../components/BusChart';

const StatistiquePage = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <Menu />
      <div className="main-content">
        <div className="container">
          <h1>Statistique</h1>

          <div className="statistic-form">
            <input type="date" className='input-date'/>
          </div>
          <div className="chart-container">
            <BusChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistiquePage;
