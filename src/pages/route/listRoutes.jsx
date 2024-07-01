import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const RouteListTable = () => {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('https://localhost:7076/api/route/list-all');
        setRoutes(response.data);
        setFilteredRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const handleSearch = () => {
    const filtered = routes.filter(route =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoutes(filtered);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredRoutes(routes);
  };

  return (
    <Box sx={{
      width: '100%',
      marginTop: 2,
      marginBottom: 2,
      padding: 2
    }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="Search Route Name"
            variant="outlined"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <Button variant="contained" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={3} md={2}>
          <Button variant="outlined" onClick={handleClear} fullWidth>
            Clear
          </Button>
        </Grid>
        <Grid item xs={3} md={2}>
          <Button variant="outlined" onClick={handleClear}
              component={Link}
              to={`/futabus-routes/add-new`} fullWidth>
            Create
            <AddIcon  sx={{ marginLeft: '10px' }} />

          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Distance (km)</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoutes.map((route, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{route.name}</TableCell>
                    <TableCell>{route.distance}</TableCell>
                    <TableCell>{route.duration}</TableCell>
                    <TableCell style={{ width: '15%' }}>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/futabus-routes/${route.id}`}
                        fullWidth
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>

  );
};

export default RouteListTable;
