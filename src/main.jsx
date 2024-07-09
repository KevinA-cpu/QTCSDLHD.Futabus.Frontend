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
import RouteDetail from './pages/route/routeDetail.jsx';
import RouteListTable from './pages/route/listRoutes.jsx';
import ScheduleDetail from './pages/route/scheduleDetail.jsx';
import AddNewRoute from './pages/route/addNewRoute.jsx';
import AddNewSchedule from './pages/route/addNewSchedule.jsx';
import SignIn from './pages/signIn.jsx';
import SignUp from './pages/signup.jsx';
import LandingPage from './pages/landingPage.jsx';
import OrderPage from './pages/order/OrderPage.jsx';
import PaymentPage from './pages/order/PaymentPage.jsx';

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
          }
        ],
      },

      {
        path: '/',
        element: <LandingPage />,
      },

      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'futabus-routes',
        element: <RouteListTable />,
      },
      {
        path: 'futabus-routes/:routeId',
        element: <RouteDetail />,
      },
      {
        path: 'futabus-routes/add-new',
        element: <AddNewRoute />,
      },
      {
        path: 'futabus-routes/:routeId/schedules/add-new',
        element: <AddNewSchedule />,
      },
      {
        path: 'futabus-routes/:routeId/schedules/:scheduleId',
        element: <ScheduleDetail />,
      },
      {
        path: "dat-ve/:routeId",
        element: <OrderPage />,
      },
      {
        path: "thanh-toan/:orderId",
        element: <PaymentPage />,
      },
    ],
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RouterProvider router={router} />
        </LocalizationProvider>
    </QueryClientProvider>
);
