import axios from 'axios';
import './axios.config';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export class IconService {

  /**
   * @param page page number
   * @param size page size
   * @return ordered list of "response" DTOs of icons
   */
  static getByPageOrdered(page, size) {
    return axios.get('/icons', {
      params: {
        page: page,
        size: size,
        includeNonActive: false
      }
    });
  }
}
