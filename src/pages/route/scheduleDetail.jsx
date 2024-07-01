import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ScheduleDetailsComponent from '../../components/ScheduleDetailsComponent';


const API_URL = 'https://localhost:7076/api/route/all-details';

const ScheduleDetail = () => {
  const { routeId } = useParams();

  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await axios.get(`${API_URL}?routeId=${routeId}`);
        setRouteData(response.data);
      } catch (error) {
        console.error('Error fetching route details:', error);
      }
    };

    fetchRouteData();
  }, []); // Chỉ gọi API khi component được mount lần đầu tiên

  return (
    <Box sx={{
      width: '100%',
      overflowX: 'auto',
      padding: '2rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      borderRadius: '0.5rem'
    }}>
      <ScheduleDetailsComponent data={routeData} />
    </Box>
  );
};

export default ScheduleDetail;
