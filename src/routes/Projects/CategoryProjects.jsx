import {useEffect, useState} from 'react';
import {useOutletContext, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {ProjectService} from '../../api/ProjectService';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';

export async function __loader({params}) {
  const projectsResponse = await ProjectService.getProjectCards(
      params.categoryUrl,
      params.sectionUrl,
      0,
      15);

  if (projectsResponse.status !== 200) {
    throw new Error('An error occurred. '
        + 'Try to reload the page or contact administrator');
  }

  const projectsPage = projectsResponse.data;
  return {projectsPage};
}

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const CategoryProjects = () => {
  const ctx = useOutletContext();

  const {sectionUrl, categoryUrl} = useParams();

  const [category, setCategory] = useState({});

  useEffect(() => {
    ctx.setLinksVisible(true);
    const ctxSection = ctx.sections.find(s => s.url === sectionUrl);
    setCategory(ctxSection.categoriesRef?.deref()
    .find(c => c.url === categoryUrl));
  }, [categoryUrl, ctx, sectionUrl]);

  const sectionTitle = ctx.sections.find(s => s.url === sectionUrl).title;

  return (<>
    {ctx.settings.meta.dynamic &&
        <Helmet>
          <title>{`${category?.title} - ${sectionTitle} - ${ctx.settings.username} ${ctx.settings.lastName}`}</title>
        </Helmet>}
    <h2>{sectionTitle} / {category?.title}</h2>
    <p className="p-text mb-4">{category?.description}</p>
    <ProjectsGrid sectionUrl={sectionUrl} categoryUrl={categoryUrl}/>
  </>);
};

export default CategoryProjects;