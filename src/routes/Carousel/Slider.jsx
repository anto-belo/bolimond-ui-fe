import {Link} from 'react-router-dom';
import {BLOCK_TYPE_PROPERTY, BlockType, Folder} from '../../enums';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Slider = ({carouselRef, slidesDivRef, slides}) => {
  function getImageSlideAttributes(slide, index) {
    const bgImgUrl = `url('${process.env.REACT_APP_API_URL}/img/${Folder.MAIN_PAGE_IMG}/${slide.content}')`;
    let style = undefined;
    let dataBgImg = undefined;
    if (index === 0 || index === 1 || index === slides.length - 1) {
      style = {backgroundImage: bgImgUrl};
      slide.loaded = true;
    } else {
      dataBgImg = bgImgUrl;
      slide.loaded = false;
    }
    return [style, dataBgImg];
  }

  function isActive(index) {
    return index === 0 ? 'active' : '';
  }

  return (
      <div ref={carouselRef} className="carousel slide">
        <div ref={slidesDivRef} className="carousel-inner">
          {slides.map((s, i) => {
            switch (s[BLOCK_TYPE_PROPERTY]) {
              case BlockType.IMAGE:
                const [style, dataBgImg] = getImageSlideAttributes(s, i);
                return (
                    <div key={s.id} title={s['additional']} style={style}
                         className={`carousel-item carousel-item-image 
                                     position-relative ${isActive(i)}`}
                         data-bg-img={dataBgImg}>
                      {s['blockConfig']['linkUrl'] &&
                          <Link to={s['blockConfig']['linkUrl']}>
                            <span className="vw-100 vh-100 position-fixed"/>
                          </Link>}
                    </div>
                );
              case 'CODE':
                return (
                    <div key={s.id} className="carousel-item"
                         dangerouslySetInnerHTML={{__html: s.content}}/>
                );
              case 'TEXT':
                return (
                    <div key={s.id} className="carousel-item">
                      <div className="w-100 h-100 d-flex
                                      justify-content-center align-items-center">
                        {s['blockConfig']['linkUrl'] &&
                            <Link to={s['blockConfig']['linkUrl']}>
                              <h1 className="h-text fs-1">{s.content}</h1>
                            </Link>}
                      </div>
                    </div>
                );
              default:
                return <></>;
            }
          })}
        </div>
      </div>);
};

export default Slider;