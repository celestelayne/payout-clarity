import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Home from './routes/Home.tsx';
import Answer from './routes/Answer.tsx';
import Flow from './routes/Flow.tsx';
import Statement from './routes/Statement.tsx';
import Guided from './routes/Guided.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Answer /> },
      { path: 'explore', element: <Home /> },
      { path: 'answer', element: <Answer /> },
      { path: 'flow', element: <Flow /> },
      { path: 'statement', element: <Statement /> },
      { path: 'guided', element: <Guided /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
