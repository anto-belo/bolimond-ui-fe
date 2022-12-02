import {useState} from 'react';
import {Outlet, useOutletContext} from 'react-router-dom';
import {IconService} from '../../api/IconService';
import Menu from './Menu/Menu';
import Links from './Links/Links';
import './projects.css';

export async function __loader() {
  const iconsResponse = await IconService.getByPageOrdered(0, 20);

  if (iconsResponse.status !== 200) {
    throw new Error('An error occurred. '
        + 'Try to reload the page or contact administrator');
  }

  const icons = iconsResponse.data;
  return {icons};
}

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const Projects = () => {
  const ctx = useOutletContext();

  const [linksVisible, setLinksVisible] = useState(true);

  return (<>
    <div className="content-height">
      <Menu/>
      <div className="w-70 mx-auto mt-4">
        <Outlet context={{...ctx, setLinksVisible: setLinksVisible}}/>
      </div>
    </div>
    <Links visible={linksVisible}/>
  </>);
};

export default Projects;