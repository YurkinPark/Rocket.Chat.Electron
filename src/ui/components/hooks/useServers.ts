import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { Server } from '../../../servers/common';
import { RootState } from '../../../store/rootReducer';
// TODO: change currentView.url string to URL type
export const useServers = (): (Server & {
  clean_url: string
  selected: boolean
})[] =>
  useSelector(
    createSelector(
      ({ currentView }: RootState) => currentView,
      ({ servers }: RootState) => servers,
      (currentView, servers) => {
        const currentViewUrl =
          typeof currentView === 'object' ? new URL(currentView.url) : false;
        return servers.map((server) => {
          const serverUrl = new URL(server.url);
          serverUrl.username = '';
          serverUrl.password = '';
          return Object.assign(server, {
            clean_url: serverUrl.href,
            selected:
              currentViewUrl &&
              currentViewUrl.href === new URL(server.url).href,
          });
        });
      }
    )
  );
