import {useState} from 'react';
import {Outlet, useLoaderData} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {PropertyService} from '../../api/PropertyService';
import {SectionService} from '../../api/SectionService';
import {mapSettings} from './settingsMapper';

export async function __loader() {
  let response = await Promise.allSettled([
    PropertyService.getSettingProperties(),
    SectionService.getByPageOrdered(0, 5)]);

  if (response[0].status === 'rejected' || response[1].status === 'rejected') {
    throw new Error('App wasn\'t able to start. '
        + 'Try to reload the page or contact administrator');
  }
  const settings = mapSettings(response[0].value.data);
  const initSections = response[1].value.data;
  return {settings, initSections};
}

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const App = () => {
  const {settings, initSections} = useLoaderData();
  const [sections, setSections] = useState(initSections);
  const [projectTitle, setProjectTitle] = useState(null);

  return (<>
    <Helmet>
      <meta name="description" content={settings.meta.description}/>
      <meta name="keywords" content={settings.meta.keywords}/>
      <title>{`${settings.username} ${settings.lastName}`}</title>
    </Helmet>
    <Outlet context={{
      settings: settings,
      sections: sections,
      setSections: setSections,
      projectTitle: projectTitle,
      setProjectTitle: setProjectTitle
    }}/>
  </>);
};

export default App;