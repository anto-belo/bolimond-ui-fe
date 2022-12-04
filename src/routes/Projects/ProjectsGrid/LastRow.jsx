/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
import ProjectCard from './ProjectCard';

const LastRow = ({
  projects,
  projectsUrl,
  layoutType,
  width,
  defaultCardWidth,
  defaultCardHeight,
  gutter
}) => {
  if (layoutType === 'fill') {
    const cardWidth = (width - 2 - (projects.length - 1) * gutter)
        / projects.length;
    const cardWidthPercent = cardWidth / width * 100 + '%';

    return projects.map((project, i) =>
        <ProjectCard key={i} title={project.title}
                     url={`${projectsUrl}/${project.url}`}
                     keyWords={project.keyWords} color={project.color}
                     titlePicUrl={project.titlePicUrl}
                     width={cardWidthPercent}
                     ratio={cardWidth / defaultCardHeight}
                     isLastInRow={i === projects.length - 1} isLastInCol/>
    );
  }

  if (layoutType === 'center') {
    return (
        <div className="w-100 d-inline-flex justify-content-center">
          {projects.map((project, i) =>
              <ProjectCard key={i} title={project.title}
                           url={`${projectsUrl}/${project.url}`}
                           keyWords={project.keyWords} color={project.color}
                           titlePicUrl={project.titlePicUrl}
                           width={defaultCardWidth}
                           ratio={defaultCardWidth / defaultCardHeight}
                           isLastInRow={i === projects.length - 1} isLastInCol/>
          )}
        </div>);
  }
};

export default LastRow;