import {useState} from 'react';
import {Outlet, useOutletContext} from 'react-router-dom';
import Menu from './Menu/Menu';
import Links from './Links/Links';
import {IconService} from '../../api/IconService';

export async function __loader() {
  let iconsResponse = await IconService.getByPageOrdered(0, 20);

  if (iconsResponse.status !== 200) {
    console.error('Failed to load icons');
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
    <div style={{minHeight: 'calc(100vh - 70px)'}}>
      <Menu/>
      <div className="w-70 mx-auto mt-4">
        <Outlet context={{...ctx, setLinksVisible: setLinksVisible}}/>
      </div>
    </div>
    <Links visible={linksVisible}/>
  </>);
};

export default Projects;