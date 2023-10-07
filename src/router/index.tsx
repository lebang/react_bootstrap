
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layout';

const lazy = (loader: () => Promise<any>) => () => loader().then(mod => ({ Component: mod.default }));

const pages = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: lazy(() => import('@/views/Home')),
      },
      {
        path: 'about',
        lazy: lazy(() => import('@/views/About')),
      },
    ],
  },
];

const router = () => <RouterProvider router={createBrowserRouter(pages)} />;
export default router;