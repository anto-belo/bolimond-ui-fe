import {NavLink} from 'react-router-dom';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const SectionLink = ({title, url, color, isLast}) => {
  function me2() {
    return !isLast ? 'me-2' : '';
  }

  return (
      <div className={`d-inline-block ${me2()}`}>
        <NavLink to={`/${url}`} className={`h-text text-uppercase ${me2()}`}
                 style={{color: color}}>
          {title}
        </NavLink>
        {!isLast && <span className="p-text" style={{color: color}}>|</span>}
      </div>);
};

export default SectionLink;