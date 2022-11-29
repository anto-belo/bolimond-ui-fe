import {NavLink} from 'react-router-dom';
import Separator from './Separator';
import {ACTIVE_COLOR, BREADCRUMBS_COLOR, DEFAULT_COLOR} from './colors';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const MenuLink = ({
  title,
  url,
  isEnd,
  isSeparated,
  isInterlevelSeparator,
  defaultColor = DEFAULT_COLOR,
  separatorColor = DEFAULT_COLOR
}) => {
  return (<>
    <NavLink to={`/${url}`} className="h-text text-uppercase"
             style={({isActive}) => ({
               color: isActive
                   ? isEnd
                       ? ACTIVE_COLOR
                       : BREADCRUMBS_COLOR
                   : defaultColor
             })}>
      {title}
    </NavLink>
    {isSeparated && <Separator isInterlevel={isInterlevelSeparator}
                               color={separatorColor}/>}
  </>);
};

export default MenuLink;