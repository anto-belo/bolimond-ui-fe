import {toRgba} from './colorUtils';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Footer = ({bgColor, textColor, keywords}) => {
  return (
      <footer className="bottom-0 carousel-footer" style={{
        backgroundColor: toRgba(bgColor, 0.3),
        color: textColor
      }}>
        <div className="w-70 h-100 mx-auto
                      d-flex justify-content-end align-items-center">
          <p className="my-0 p-text text-uppercase" style={{color: textColor}}>
            {keywords?.replaceAll(',', ' | ')}
          </p>
        </div>
      </footer>
  );
};

export default Footer;