import {useEffect, useState} from 'react';
import {useLoaderData} from 'react-router-dom';
import {usePerPageLoader} from '../../../hooks/usePerPageLoader';
import {ProjectService} from '../../../api/ProjectService';
import GridPane from './GridPane';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const ProjectsGrid = ({sectionUrl, categoryUrl}) => {
  const {projectsPage} = useLoaderData();

  const [projects, setProjects] = useState(projectsPage);

  const [allLoaded, loadNextPage, resetState] = usePerPageLoader(
      (page, size) => ProjectService.getProjectCards(categoryUrl, sectionUrl,
          page, size), 1, 15, setProjects);

  useEffect(() => resetState(1, projectsPage), [projectsPage]);

  return <GridPane projects={projects} allLoaded={allLoaded}
                   loadNextPage={loadNextPage}/>;
};

export default ProjectsGrid;