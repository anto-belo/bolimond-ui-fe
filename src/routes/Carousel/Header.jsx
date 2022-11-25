import {NavLink, useOutletContext} from 'react-router-dom';
import SectionLink from './SectionLink';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Header = ({bgColor, textColor}) => {
  const ctx = useOutletContext();

  return (
      <header className="top-0 carousel-header"
              style={{backgroundColor: bgColor}}>
        <div className="w-70 h-100 mx-auto pt-4 d-flex justify-content-between">
          <NavLink to="/" className="h-text" style={{color: textColor}}>
            {ctx.settings.lastName} {ctx.settings.username}
          </NavLink>
          <div>
            {ctx.sections
            .sort((s1, s2) => s2['seqPosition'] - s1['seqPosition'])
            .map((s, i) => (
                <SectionLink key={i} url={s.url} title={s.title}
                             color={textColor}
                             isLast={i === ctx.sections.length - 1}/>
            ))}
          </div>
        </div>
      </header>);
};

export default Header;