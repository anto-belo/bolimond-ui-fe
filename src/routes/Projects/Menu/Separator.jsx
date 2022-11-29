import {separatorHeight} from './css.utils';
import {DEFAULT_COLOR} from './colors';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Separator = ({color = DEFAULT_COLOR, isInterlevel}) => {
  return (
      <div className={`ms-2 separator ${separatorHeight(isInterlevel)}`}
           style={{backgroundColor: color}}/>);
};

export default Separator;