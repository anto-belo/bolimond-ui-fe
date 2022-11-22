import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './routes/App/App';
import Carousel from './routes/Carousel/Carousel';
import CategoryProjects from './routes/Projects/CategoryProjects';
import Error from './routes/Error/Error';
import Project from './routes/Project/Project';
import Projects from './routes/Projects/Projects';
import SectionProjects from './routes/Projects/SectionProjects';

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
          errorElement: <Error/>,
          children: [
            {
              index: true,
              element: <Carousel/>
            },
            {
              path: '/:sectionUrl',
              element: <Projects/>,
              children: [
                {
                  index: true,
                  element: <SectionProjects/>
                },
                {
                  path: '/:categoryUrl',
                  element: <CategoryProjects/>
                },
                {
                  path: '/:categoryUrl/:projectUrl',
                  element: <Project/>
                }
              ]
            }
          ]
        }
      ])}/>
    </React.StrictMode>
);