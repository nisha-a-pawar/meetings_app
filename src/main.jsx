import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import AddMeetings from './pages/AddMeetings.jsx';
import MyMeetings from './pages/MyMeetings.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css';

const Approute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-meetings",
        element: <AddMeetings />,
      },
      {
        path: "/my-meetings",
        element: <MyMeetings />,
      },
     
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={Approute} />
);
