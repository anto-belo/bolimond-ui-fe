import {useLoaderData, useOutletContext} from 'react-router-dom';
import {Folder} from '../../../enums';
import './links.css';

/**
 * @author Anton Belousov
 * @since 0.0.1-SNAPSHOT
 */
const Links = ({visible}) => {
  const ctx = useOutletContext();

  const {icons} = useLoaderData();

  return (
      <div className={`row row-cols-1 row-cols-lg-2 w-70 mx-auto mt-4 g-0 
                       ${!visible ? 'd-none' : ''}`}>
        <div className="col mb-1 mb-lg-0 d-flex justify-content-center
                        d-lg-block">
          {icons.map(i =>
              <a key={i.id} href={i['linkToUrl']} target="_blank"
                 rel="noreferrer">
                <img
                    src={`${process.env.REACT_APP_API_URL}/img/${Folder.ICON_IMG}/${i['picUrl']}`}
                    className="icon" alt={i.title} title={i.title}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      e.target.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      e.target.style.opacity = 0.5;
                    }}/>
              </a>
          )}
        </div>
        <div className="col p-text">
          <p className="text-center text-lg-end my-0">
            <a href={`callto:${ctx.settings.phone}`}
               title={ctx.settings.phone}>
              {ctx.settings.phone}
            </a>
            <span className="p-text mx-2 d-none d-lg-inline"
                  style={{color: '#bebebe'}}>|</span>
            <br className="d-inline d-lg-none"/>
            <a href={`mailto:${ctx.settings.email}`}
               title={ctx.settings.email}>
              {ctx.settings.email}
            </a>
          </p>
        </div>
        <div className="mb-3"/>
      </div>
  );
};

export default Links;