import axios from 'axios';
import './axios.config';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export class CategoryService {

  /**
   * @param page      page number
   * @param size      page size
   * @param sectionId parent section id. If not specified, categories from all
   *                  sections will be returned
   * @return ordered list of <b>active</b> "response" DTOs of categories, which
   * have specified section as their parent, if the sectionId was specified;
   * otherwise - ordered list of categories from all the sections
   */
  static getByPageOrdered(page, size, sectionId) {
    return axios.get('/categories', {
      params: {
        page: page,
        size: size,
        sectionId: sectionId
      }
    });
  }

  /**
   * @param url        category part of the URL
   * @param sectionUrl section part of the URL
   * @return appropriate category
   */
  static getByUrl(url, sectionUrl) {
    return axios.get('/category/byUrl', {
      params: {
        categoryUrl: url,
        sectionUrl: sectionUrl
      }
    });
  }
}
