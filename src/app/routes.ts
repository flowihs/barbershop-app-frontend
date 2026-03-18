import { createBrowserRouter } from 'react-router';
import Layout from './Layout';
import HomePage from '../pages/home/HomePage';
import BookingPage from '../pages/booking/BookingPage';
import ProfilePage from '../pages/profile/ProfilePage';
import ServiceDetailPage from '../pages/service/ServiceDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'booking',
        Component: BookingPage,
      },
      {
        path: 'profile',
        Component: ProfilePage,
      },
      {
        path: 'provisions/:id',
        Component: ServiceDetailPage,
      },
    ],
  },
])

