import './style/StatistiquePage.css';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pie ,Bar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';

// Enregistrer les composants Chart.js pour qu'ils soient utilisés par react-chartjs-2
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatistiquePage = () => {
  const navigate = useNavigate();
  const [dataMontee, setDataMontee] = useState([]);
  const [chartDataTravailParBus, setChartDataTravailParBus] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Statistiques',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [chartDataMontee, setChartDataMontee] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Statistiques',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [selectedMonth, setSelectedMonth] = useState<string>('2024-11'); // Format YYYY-MM

  async function getMonteeData() {
    try {
      const [year, month] = selectedMonth.split('-'); // Extraire l'année et le mois
      const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/statistique/monteeParBus`, {
        params: {
          mois: parseInt(month), // Convertir en 0-indexé
          annee: parseInt(year),
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      processChartDataMontee(response.data.data, 'Nb total passager');
    } catch (error) {
      console.error('Erreur lors de la récupération des données : ', error);
    }
  }
  async function getTravBus() {
    try {
      const [year, month] = selectedMonth.split('-'); // Extraire l'année et le mois
      const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/statistique/travParBus`, {
        params: {
          mois: parseInt(month), // Convertir en 0-indexé
          annee: parseInt(year),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data.data);
      processChartDataTravailParBus(response.data.data, 'Nb trajet effectué');
    } catch (error) {
      console.error('Erreur lors de la récupération des données : ', error);
    }
  }


  function processChartDataMontee(data:any[], label:any) {
    if (data && Array.isArray(data)) {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);
    const backgroundColors = data.map(() => getRandomColor());
    setChartDataMontee({
      labels: labels,
      datasets: [
        {
          label: label,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    });
  }else {
    setChartDataMontee({labels: [],
      datasets: [
        {
          label: 'Statistiques',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],});
  }
}
  function processChartDataTravailParBus(data: any[], label: any) {
    if (data && Array.isArray(data)) {
      const labels = data.map(item => item.label);
      const values = data.map(item => item.value);
      const backgroundColors = data.map(() => getRandomColor());
      setChartDataTravailParBus({
        labels: labels,
        datasets: [
          {
            label: label,
            data: values,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      });
    } else {
      setChartDataTravailParBus({labels: [],
        datasets: [
          {
            label: 'Statistiques',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],});
    }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    getMonteeData();
    getTravBus();
  }, [selectedMonth]);

  return (
    <div className="app">
      <Menu />
      <div className="main-content">
        <div className="container">
          <h1>Statistique</h1>
          <div className="statistic-form">
            <input 
              type="month" 
              className='input-date' 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)} // Mettre à jour l'état
            />
          </div>
          <div className="chart-container">
            
            <div style={{ width: '400px', height: '500px' }}>
              <h3 className='titleStat'>Nombre de passager par bus</h3>
              <Bar 
                style={{fontFamily:'Poppins'}} 
                data={chartDataMontee} 
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                          family: 'Poppins', // Changer la police ici
                        },
                      },
                    },
                  
                  },
                }} 
              />
            </div>
            <div style={{ width: '400px', height: '500px' }}>
              <h3 className='titleStat'>Nombre de trajet effectué par bus</h3>
              <Pie 
                data={chartDataTravailParBus} 
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                          family: 'Poppins', // Changer la police ici
                        },
                      },
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistiquePage;
