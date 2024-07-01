import { Box } from '@mui/material';
import AddRouteForm from '../../components/AddRouteForm';
const AddNewRoute = () => {

  return (
    <Box sx={{
      width: '100%',
      overflowX: 'auto',
      padding: '2rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      borderRadius: '0.5rem'
    }}>
      <AddRouteForm />
    </Box>
  );
};

export default AddNewRoute;
