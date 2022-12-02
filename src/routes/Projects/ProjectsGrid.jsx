import {useEffect, useState} from 'react';
import {useLoaderData, useOutletContext} from 'react-router-dom';
import {usePerPageLoader} from '../../hooks/usePerPageLoader';
import {ProjectService} from '../../api/ProjectService';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const ProjectsGrid = ({sectionUrl, categoryUrl}) => {
  const ctx = useOutletContext();

  const {projectsPage} = useLoaderData();

  const [projects, setProjects] = useState(projectsPage);

  const [allLoaded, loadNextPage, resetState] = usePerPageLoader(
      (page, size) => ProjectService.getProjectCards(categoryUrl, sectionUrl,
          page, size), 1, 15, setProjects);

  useEffect(() => resetState(1, projectsPage), [projectsPage]);

  return (
      <div>

      </div>
  );
};

export default ProjectsGrid;