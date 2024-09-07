/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import CreateFramePage from '../CreateFramePage';
import EditFramePage from '../EditFramePage';
import { DesignSystemProvider, darkTheme } from '@strapi/design-system';

const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" theme={darkTheme}>
      <div>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route path={`/plugins/${pluginId}/create-frame`} component={CreateFramePage} exact />
          <Route path={`/plugins/${pluginId}/edit-frame/:id`} component={EditFramePage} exact />
          <Route component={AnErrorOccurred} />
        </Switch>
      </div>
    </DesignSystemProvider>
  );
};

export default App;
