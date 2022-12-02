import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App, {__loader as appLoader} from './routes/App/App';
import Carousel, {__loader as carouselLoader} from './routes/Carousel/Carousel';
import CategoryProjects, {
  __loader as categoryProjectsLoader
} from './routes/Projects/CategoryProjects';
import Error from './routes/Error/Error';
import Project from './routes/Project/Project';
import Projects, {__loader as projectsLoader} from './routes/Projects/Projects';
import SectionProjects, {
  __loader as sectionProjectsLoader
} from './routes/Projects/SectionProjects';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={createBrowserRouter([
        {
          path: '/',
          element: <App/>,
          loader: appLoader,
          errorElement: <Error/>,
          children: [
            {
              index: true,
              element: <Carousel/>,
              loader: carouselLoader
            },
            {
              path: ':sectionUrl',
              element: <Projects/>,
              loader: projectsLoader,
              children: [
                {
                  index: true,
                  element: <SectionProjects/>,
                  loader: sectionProjectsLoader
                },
                {
                  path: ':categoryUrl',
                  element: <CategoryProjects/>,
                  loader: categoryProjectsLoader
                },
                {
                  path: ':categoryUrl/:projectUrl',
                  element: <Project/>
                }
              ]
            }
          ]
        }
      ], {
        basename: process.env.REACT_APP_BASE_URL
      })}/>
    </React.StrictMode>);
