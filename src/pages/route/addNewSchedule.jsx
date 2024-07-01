import { Box } from '@mui/material';
import AddScheduleForm from '../../components/AddScheduleForm';
const AddNewSchedule = () => {

  return (
    <Box sx={{
      width: '100%',
      overflowX: 'auto',
      padding: '2rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      borderRadius: '0.5rem'
    }}>
      <AddScheduleForm />
    </Box>
  );
};

export default AddNewSchedule;
