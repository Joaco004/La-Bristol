import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import PlayerProfile from './pages/PlayerProfile';
import Merch from './pages/Merch';
import Admin from './pages/Admin';
import './styles/globals.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'team', element: <Team /> },
      { path: 'team/:id', element: <PlayerProfile /> },
      { path: 'merch', element: <Merch /> },
    ],
  },
  { path: '/admin-lbrl', element: <Admin /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
