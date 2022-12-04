import {useState} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {toRgba} from '../../Carousel/colorUtils';
import {Folder} from '../../../enums';
import './project-card.css';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const ProjectCard = ({
  title,
  url,
  color,
  keyWords,
  titlePicUrl,
  width,
  ratio,
  isLastInRow,
  isLastInCol
}) => {
  const ctx = useOutletContext();

  const navigate = useNavigate();

  const defaultColor = 'rgba(0, 0, 0, 0.3)';
  const hoverColor = toRgba(color, 0.3);

  const [textBlock, setTextBlock] = useState({
    color: defaultColor,
    text: title
  });

  return (
      <div className="d-inline-flex align-items-end bg-position-center
                      bg-size-cover cursor-pointer" style={{
        width: width,
        aspectRatio: ratio || 1.429,
        backgroundImage: `url('${process.env.REACT_APP_API_URL}/img/${Folder.PROJECT_CARD_IMG}/${titlePicUrl}')`,
        marginBottom: isLastInCol ? 0 : ctx.settings.layout.gutter,
        marginRight: isLastInRow ? 0 : ctx.settings.layout.gutter
      }} onClick={() => navigate(url, {replace: true})}
           onMouseEnter={() => setTextBlock(
               {color: hoverColor, text: `${title},${keyWords}`})}
           onMouseLeave={() => setTextBlock(
               {color: defaultColor, text: title})}>
        <div className="h-20 d-flex justify-content-end align-items-center
                        flex-grow-1 p-text text-uppercase text-white
                        text-truncate card-name" style={{
          backgroundColor: textBlock.color
        }}>
            <span className="me-2">
              {textBlock.text?.replaceAll(',', ' | ')}
            </span>
        </div>
      </div>);
};

export default ProjectCard;