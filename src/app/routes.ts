import { createBrowserRouter } from 'react-router';
import Layout from './Layout';
import HomePage from '../pages/home/HomePage';
import ShedulePage from '../pages/schedule/SchedulePage';
import ProfilePage from '../pages/profile/ProfilePage';
import ServiceDetailPage from '../pages/provisions/ServiceDetailPage';
import BarberServicesPage from '../pages/barber/services/BarberServicesPage';
import CreateService from '../pages/barber/services/create/CreateService';

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
        path: 'schedule',
        Component: ShedulePage,
      },
      {
        path: 'profile',
        Component: ProfilePage,
      },
      {
        path: 'provisions/:id',
        Component: ServiceDetailPage,
      },
      {
        path: 'barber-services',
        Component: BarberServicesPage,
        children: [
          { path: 'create', Component: CreateService}
          // { path: 'edit/:id', Component: }
        ]
      }
    ],
  },
]);
