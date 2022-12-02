import {useCallback, useEffect, useRef, useState} from 'react';
import {useLoaderData, useOutletContext} from 'react-router-dom';
import {Carousel as BSCarousel} from 'bootstrap';
import {usePerPageLoader} from '../../hooks/usePerPageLoader';
import {DataBlockService} from '../../api/DataBlockService';
import {toOppositeHex, toRgba} from './colorUtils';
import './carousel.css';
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';

const SLIDES_PAGE_SIZE = 100;

export async function __loader() {
  const response = await DataBlockService.getMainPageBlocksOrdered(
      0, SLIDES_PAGE_SIZE);
  return response.data;
}

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Carousel = () => {
  const ctx = useOutletContext();

  const [slides, setSlides] = useState(useLoaderData());

  const [keyWords, setKeyWords] = useState('');
  const [bgColor, setBgColor] = useState('#000');

  const [allLoaded, loadNextPage] = usePerPageLoader(
      (page, size) => DataBlockService.getMainPageBlocksOrdered(page, size),
      1,
      SLIDES_PAGE_SIZE,
      setSlides);

  const slidesDivRef = useRef(null);
  const carouselRef = useRef(null);

  const carousel = useRef(null);
  const isSliding = useRef(false);
  const loadedCounter = useRef(0);

  const onSlide = useCallback((e) => {
    if (slides.length === 0) {
      return;
    }

    isSliding.current = true;

    let preloadSlideIndex = e.direction === 'left' ? e.to + 1 : e.to - 1;
    if (preloadSlideIndex > slides.length - 1) {
      preloadSlideIndex = 0;
    } else if (preloadSlideIndex < 0) {
      preloadSlideIndex = slides.length - 1;
    }

    const preloadSlide = slidesDivRef.current.children.item(preloadSlideIndex);
    const bgImgUrl = preloadSlide.getAttribute('data-bg-img');

    if (bgImgUrl) {
      preloadSlide.style.backgroundImage = bgImgUrl;
      preloadSlide.removeAttribute('data-bg-img');
      slides[preloadSlideIndex].loaded = true;
      loadedCounter.current++;
      if (!allLoaded && slides.length - loadedCounter.current < 5) {
        loadNextPage();
      }
    }

    setKeyWords(slides[e.to]['blockConfig']['linkKeyWords']);
    if (ctx.settings.enableMainColors) {
      setBgColor(slides[e.to]['blockConfig']['color']);
    }
  }, [ctx.settings.enableMainColors, slides]);

  useEffect(() => {
    carousel.current = new BSCarousel(carouselRef.current, {
      interval: ctx.settings.imgSwitchInterval,
      pause: false,
      ride: 'carousel'
    });
    carousel.current.cycle();

    const onSlid = () => isSliding.current = false;
    const onWheel = (e) => {
      if (!isSliding.current) {
        if (e.deltaY > 0) {
          carousel.current.next();
        } else {
          carousel.current.prev();
        }
      }
    };

    const carouselRefCur = carouselRef.current;
    carouselRefCur.addEventListener('slide.bs.carousel', onSlide);
    carouselRefCur.addEventListener('slid.bs.carousel', onSlid);
    carouselRefCur.addEventListener('wheel', onWheel, {passive: true});
    return () => {
      carousel.current.dispose();
      carouselRefCur.removeEventListener('slide.bs.carousel', onSlide);
      carouselRefCur.removeEventListener('slid.bs.carousel', onSlid);
      carouselRefCur.removeEventListener('wheel', onWheel);
    };
  }, [ctx.settings.imgSwitchInterval, onSlide]);

  useEffect(() => {
    if (slides.length !== 0) {
      setKeyWords(slides[0]['blockConfig']['linkKeyWords']);
      setBgColor(ctx.settings.enableMainColors
          ? slides[0]['blockConfig']['color']
          : '#000');
    }
  }, []);

  return (<>
    <Header bgColor={toRgba(bgColor, 0.3)} textColor={toOppositeHex(bgColor)}/>
    <Slider carouselRef={carouselRef} slidesDivRef={slidesDivRef}
            slides={slides}/>
    <Footer bgColor={bgColor} textColor={toOppositeHex(bgColor)}
            keywords={keyWords}/>
  </>);
};

export default Carousel;