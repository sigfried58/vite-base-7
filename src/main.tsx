import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import './index.css';

import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary.tsx';

const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
