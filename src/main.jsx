import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import JobLayout from './pages/JobLayout.jsx';
import JobPosting from './pages/JobPosting.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import JobDetails from './pages/JobDetails.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <JobLayout />,
        children: [
          {
            path: 'tuyen-dung',
            element: <JobPosting />,
          },
          {
            path: 'tuyen-dung/:id',
            element: <JobDetails />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
