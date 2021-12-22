import React, { FC } from 'react';

import { useServers } from '../hooks/useServers';
import { ReparentingContainer } from '../utils/ReparentingContainer';
import { ServerPane } from './ServerPane';

export const ServersView: FC = () => {
  const servers = useServers();

  return (
    <ReparentingContainer>
      {servers.map((server) => (
        <ServerPane
          key={server.clean_url}
          lastPath={server.lastPath}
          serverUrl={server.clean_url}
          isSelected={server.selected}
          isFailed={server.failed ?? false}
        />
      ))}
    </ReparentingContainer>
  );
};
