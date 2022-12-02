import {useEffect, useState} from 'react';
import {useOutletContext, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {ProjectService} from '../../api/ProjectService';
import {SectionService} from '../../api/SectionService';
import ProjectsGrid from './ProjectsGrid';

export async function __loader({params}) {
  const projectsResponse = await ProjectService.getProjectCards(null,
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
const SectionProjects = () => {
  const ctx = useOutletContext();

  const {sectionUrl} = useParams();

  const [section, setSection] = useState({});

  useEffect(() => {
    const ctxSection = ctx.sections.find(s => s.url === sectionUrl);

    if (!ctxSection) {
      throw new Error(`Unknown section url: ${sectionUrl}`);
    }

    ctx.setLinksVisible(!ctxSection.custom);
    if (ctxSection.custom && !ctxSection.markup) {
      SectionService.getCustomSection(ctxSection.id)
      .then((r) => {
        ctx.sections.find(s => s.id === ctxSection.id).markup = r.data;
        ctx.setSections([...ctx.sections]);
        setSection(ctxSection);
      })
      .catch(() => {
        throw new Error('An error occurred. '
            + 'Try to reload the page or contact administrator');
      });
    } else {
      setSection(ctxSection);
    }
  }, [ctx, sectionUrl]);

  return (<>
    {ctx.settings.meta.dynamic &&
        <Helmet>
          <title>{`${section.title} - ${ctx.settings.username} ${ctx.settings.lastName}`}</title>
        </Helmet>}
    {section.custom
        ? <div className="p-text overflow-hidden"
               dangerouslySetInnerHTML={{__html: section.markup}}/>
        : <ProjectsGrid sectionUrl={sectionUrl}/>}
  </>);
};

export default SectionProjects;