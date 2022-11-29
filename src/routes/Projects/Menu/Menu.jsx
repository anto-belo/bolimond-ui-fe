import {NavLink, useOutletContext, useParams} from 'react-router-dom';
import Section from './Section';
import {headerHeight} from './css.utils';
import './menu.css';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Menu = () => {
  const ctx = useOutletContext();

  const {projectUrl} = useParams();

  return (
      <header className={`w-100 top-0 position-fixed 
                          ${headerHeight(projectUrl)}`}>
        <div className="w-70 h-100 mx-auto pt-4 d-flex justify-content-between">
          <NavLink to="/" className="h-text">
            {ctx.settings.lastName} {ctx.settings.username}
          </NavLink>
          <div>
            {ctx.sections
            .sort((s1, s2) => s2['seqPosition'] - s1['seqPosition'])
            .map((s, i) => (
                <Section key={i} title={s.title} url={s.url}
                         isLast={i === ctx.sections.length - 1}/>))}
          </div>
        </div>
      </header>);
};

export default Menu;