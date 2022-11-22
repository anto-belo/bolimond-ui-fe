// @flow
import axios from 'axios';
import './axios.config';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export class SectionService {

  /**
   * @param page page number
   * @param size page size
   * @return ordered list of section "response" DTOs
   */
  static getByPageOrdered(page: number, size: number) {
    return axios.get('/sections', {
      params: {
        page: page,
        size: size,
        includeNonActive: false
      }
    });
  }

  /**
   * @param id section id
   * @return section-associated custom markup (w/ placeholders fulfilled)
   */
  static getCustomSection(id: number) {
    return axios.get(`/sections/${id}/markup`);
  }
}
