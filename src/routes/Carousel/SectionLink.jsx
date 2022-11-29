import {linkOffset} from '../Projects/Menu/css.utils';
import MenuLink from '../Projects/Menu/MenuLink';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const SectionLink = ({title, url, color, isLast}) => {
  return (
      <div className={`d-inline-block ${linkOffset(isLast)}`}>
        <MenuLink title={title} url={url} separatorColor={color}
                  defaultColor={color} isSeparated={!isLast}/>
      </div>);
};

export default SectionLink;