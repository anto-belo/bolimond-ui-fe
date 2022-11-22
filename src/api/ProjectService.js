// @flow
import axios from 'axios';
import './axios.config';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export class ProjectService {

  /**
   * @param categoryUrl project's parent category url
   * @param sectionUrl  category's parent section url
   * @param page page number
   * @param size page size
   * @return list of projects in sectionUrl/categoryUrl
   */
  static getProjectCards(
      categoryUrl: string,
      sectionUrl: string,
      page: number,
      size: number) {
    return axios.get('/project-cards', {
      params: {
        categoryUrl: categoryUrl,
        sectionUrl: sectionUrl,
        page: page,
        size: size
      }
    });
  }

  /**
   * @param sectionUrl  category's parent section url
   * @param categoryUrl project's parent category url
   * @param projectUrl  project url
   * @return project, located on sectionUrl/categoryUrl/projectUrl
   */
  static getProject(
      projectUrl: string,
      categoryUrl: string,
      sectionUrl: string) {
    return axios.get('/project/byUrl', {
      params: {
        projectUrl: projectUrl,
        categoryUrl: categoryUrl,
        sectionUrl: sectionUrl
      }
    });
  }
}
