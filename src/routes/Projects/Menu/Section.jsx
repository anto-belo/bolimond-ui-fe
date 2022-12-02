/* globals WeakRef */
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
    if (url !== sectionUrl) {
      return;
    }
    const thisSection = ctx.sections.find(s => s.url === sectionUrl);
    if (thisSection.custom) {
      return;
    }

    if (!thisSection.categoriesRef?.deref()) {
      CategoryService.getByPageOrdered(0, 5, thisSection.id)
      .then((r) => {
        ctx.sections.find(s => s.id === thisSection.id).categoriesRef
            = new WeakRef(r.data);
        ctx.setSections([...ctx.sections]);
      })
      .catch(() => {
        throw new Error('An error occurred. '
            + 'Try to reload the page or contact administrator');
      });
    } else {
      setCategories(thisSection.categoriesRef.deref());
    }
  }, [ctx, sectionUrl, url]);

  return (
      <div className={`d-inline-block position-relative ${linkOffset(isLast)}`}>
        <MenuLink title={title} url={url} isEnd={!categoryUrl}
                  isSeparated={!isLast}/>
        {url === sectionUrl && categories.length !== 0 &&
            <div className={`vw-100 position-absolute end-0 d-flex
                             justify-content-end align-items-end 
                             ${interlevelOffset(!isLast)}`}>
              {categories
              .sort((c1, c2) => c2['seqPosition'] - c1['seqPosition'])
              .map((c, i) =>
                  <Category key={i} title={c.title} url={c.url}
                            isLast={i === categories.length - 1}
                            isInLastSection={isLast}/>)}
            </div>}
      </div>
  );
};

export default Section;