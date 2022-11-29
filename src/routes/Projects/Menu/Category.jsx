import {useOutletContext, useParams} from 'react-router-dom';
import MenuLink from './MenuLink';
import {interlevelOffset, linkOffset} from './css.utils';
import {CATEGORIES_COLOR} from './colors';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Category = ({title, url, isLast, isInLastSection}) => {
  const ctx = useOutletContext();

  const {sectionUrl, categoryUrl, projectUrl} = useParams();

  const isSeparatorPresent = !(isInLastSection && isLast);

  return (
      <div className={`d-inline-block position-relative 
                       ${linkOffset(isLast)}`}>
        <MenuLink title={title} url={`${sectionUrl}/${url}`} isEnd={!projectUrl}
                  isSeparated={isSeparatorPresent}
                  isInterlevelSeparator={isLast}
                  defaultColor={CATEGORIES_COLOR}/>
        {url === categoryUrl && projectUrl &&
            <div className={`vw-100 position-absolute end-0 d-flex
                             justify-content-end align-items-end 
                             ${interlevelOffset(isSeparatorPresent)}`}>
              <span>
              <MenuLink title={ctx.projectTitle}
                        url={`${sectionUrl}/${url}/${projectUrl}`} isEnd
                        isSeparated={isSeparatorPresent} isInterlevelSeparator/>
              </span>
            </div>}
      </div>
  );
};

export default Category;