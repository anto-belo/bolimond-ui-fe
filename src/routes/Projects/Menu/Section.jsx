import {useEffect, useState} from 'react';
import {useOutletContext, useParams} from 'react-router-dom';
import {CategoryService} from '../../../api/CategoryService';
import Category from './Category';
import MenuLink from './MenuLink';
import {interlevelOffset, linkOffset} from './css.utils';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Section = ({title, url, isLast}) => {
  const ctx = useOutletContext();

  const {sectionUrl, categoryUrl} = useParams();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const section = ctx.sections.find(s => s.url === sectionUrl);

    if (section) {
      if (!section.custom) {
        CategoryService.getByPageOrdered(0, 5, section.id)
        .then((r) => setCategories(r.data))
        .catch((e) => {
          throw new Error(e.response.data || e.message);
        });
        return () => setCategories([]);
      }
      return;
    }
    throw new Error(`Unknown section url: ${sectionUrl}`);
  }, [ctx.sections, sectionUrl]);

  const isLastSection
      = sectionUrl === ctx.sections[ctx.sections.length - 1].url;

  return (
      <div className={`d-inline-block position-relative ${linkOffset(isLast)}`}>
        <MenuLink title={title} url={url} isEnd={!categoryUrl}
                  isSeparated={!isLast}/>
        {url === sectionUrl && categories.length !== 0 &&
            <div className={`vw-100 position-absolute end-0 d-flex
                             justify-content-end align-items-end 
                             ${interlevelOffset(!isLastSection)}`}>
              {categories
              .sort((c1, c2) => c2['seqPosition'] - c1['seqPosition'])
              .map((c, i) =>
                  <Category key={i} title={c.title} url={c.url}
                            isLast={i === categories.length - 1}
                            isInLastSection={isLastSection}/>)}
            </div>}
      </div>
  );
};

export default Section;