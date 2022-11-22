import axios from 'axios';
import './axios.config';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export class DataBlockService {

  /**
   * @param page page number
   * @param size page size
   * @return ordered list of "response" DTOs of main page blocks
   */
  static getMainPageBlocksOrdered(page, size) {
    return axios.get('/main-page/blocks', {
      params: {
        page: page,
        size: size,
        randomizeUnfixed: true
      }
    });
  }

  /**
   * @param projectUrl  project part of the URL
   * @param categoryUrl category part of the URL
   * @param sectionUrl  section part of the URL
   * @param page page number
   * @param size page size
   * @return ordered list of "response" DTOs of blocks of the specified project
   */
  static getProjectBlocksOrdered(
      sectionUrl,
      categoryUrl,
      projectUrl,
      page,
      size) {
    return axios.get('/project/blocks/byUrl', {
      params: {
        sectionUrl: sectionUrl,
        categoryUrl: categoryUrl,
        projectUrl: projectUrl,
        page: page,
        size: size
      }
    });
  }
}
