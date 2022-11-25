import {useState} from 'react';
import {Outlet, useLoaderData} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {AppContext} from '../../contexts/AppContext';
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
  const sections = response[1].value.data;
  return {settings, sections};
}

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
const App = () => {
  const {settings, sections} = useLoaderData();
  const [projectTitle, setProjectTitle] = useState(null);

  return (
      <AppContext.Provider value={{
        settings: settings,
        sections: sections,
        projectTitle: projectTitle,
        setProjectTitle: setProjectTitle
      }}>
        <Helmet>
          <meta name="description" content={settings.meta.description}/>
          <meta name="keywords" content={settings.meta.keywords}/>
          <title>{`${settings.username} ${settings.lastName}`}</title>
        </Helmet>
        <Outlet/>
      </AppContext.Provider>
  );
};

export default App;