import {useRef} from 'react';
import {useOutletContext} from 'react-router-dom';
import {useResizeDetector} from 'react-resize-detector';
import ProjectCard from './ProjectCard';
import LastRow from './LastRow';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const GridPane = ({projects, projectsUrl, allLoaded, loadNextPage}) => {
  const ctx = useOutletContext();

  const paneRef = useRef(null);
  const {width} = useResizeDetector({
    handleHeight: false,
    targetRef: paneRef
  });

  const lt = ctx.settings.layout;
  // colsAmount * cardWidth + (colsAmount - 1) * gutter = width - 2
  // (-2 is the delta, which helps to reduce the flickering, while resizing)
  const gutter = gutterPx();
  const cardWidth = (width - 2 - (lt.colsAmount - 1) * gutter)
      / lt.colsAmount;
  const cardWidthPercent = cardWidth / width * 100 + '%';

  const lastRowSize = projects.length % lt.colsAmount;
  const totalInFullRows = projects.length - lastRowSize;
  const mainGridSize = lt.lastRowType === 'none'
      ? projects.length
      : totalInFullRows;

  function isLastInRow(index) {
    return (index + 1) % lt.colsAmount === 0;
  }

  function isLastInCol(index) {
    return projects.length - lastRowSize < (index + 1)
        && (index + 1) <= projects.length;
  }

  function gutterPx() {
    const gt = lt.gutter;
    const defaultGutter = 16;
    if (gt.endsWith('px')) {
      return Number(lt.gutter.substring(0, lt.gutter.length - 2));
    } else if (gt.endsWith('%')) {
      return width * Number(lt.gutter.substring(0, lt.gutter.length - 1)) / 100;
    }
    return defaultGutter;
  }

  return (
      <div ref={paneRef}>
        {projects.slice(0, mainGridSize).map((project, i) =>
            <ProjectCard key={i} title={project.title}
                         url={`${projectsUrl}/${project.url}`}
                         keyWords={project.keyWords} color={project.color}
                         titlePicUrl={project.titlePicUrl}
                         width={cardWidthPercent} ratio={1 / lt.relHeight}
                         isLastInRow={isLastInRow(i)}
                         isLastInCol={isLastInCol(i)}/>
        )}
        {lt.lastRowType !== 'none' && lastRowSize !== 0 &&
            <LastRow projects={projects.slice(mainGridSize)} width={width}
                     projectsUrl={projectsUrl} layoutType={lt.lastRowType}
                     defaultCardWidth={cardWidth} gutter={gutter}
                     defaultCardHeight={cardWidth * lt.relHeight}/>}
        {!allLoaded &&
            <div className="d-flex justify-content-center">
              <button className="btn btn-secondary btn-sm" type="button"
                      onClick={loadNextPage}>
                Load more
              </button>
            </div>}
      </div>);
};

export default GridPane;