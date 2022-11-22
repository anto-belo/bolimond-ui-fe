import axios from 'axios';
import './axios.config';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export class PropertyService {

  /**
   * @return properties with {@code isRemovable = false}
   */
  static getSettingProperties() {
    return axios.get('/settings');
  }
}
