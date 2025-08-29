import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout';
import Dashboard from './components/Dashbord';
import EarthquakeList from './components/EarthquakeList';
import Weather from './components/Weather';


const rooter = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "/earthquakes",
        element: <EarthquakeList/>
      },
      {
        path: "/weather",
        element: <Weather/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rooter}/>
  </React.StrictMode>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
