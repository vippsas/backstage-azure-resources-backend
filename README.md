# Azure resources backend plugin

The backend API plugin used by the frontend plugin. This plugin wraps a few Azure Resource Graph queries to pull information about your Azure resource resources in relation to a backstage entity.


## Getting started

Add following to your backstage instance

```TypeScript
/// ./packages/backend/src/azure-resources-backend.ts
import { createRouter } from '@vippsno/plugin-azure-resources-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
  });
}
```

```TypeScript
/// ./packages/backend/src/index.ts

import azureResourcesBackend from './plugins/azure-resources-backend';
const azureResourcesBackendEnv = useHotMemoize(module, () => createEnv('azure-resources-backend'));
apiRouter.use('/azure-resources', await azureResourcesBackend(azureResourcesBackendEnv));
```

## Authentication with Azure

In order for this plugin to work, you'll need an identity with `read` access at the scope you pull information from.  
Depending on where your backstage instance is running, there are a few ways to authenticate. The plugin uses `@azure/identity` which supports `managed identities` and `application registration`

### Using managed identity

In case your backstage instance runs on an Azure resource type that supports system assignen managed identity, the only thing you need to do is assign the `service principal` with read permission on the `resource group`, `subscription(s)` or `management group`, depending on your environment.

### App registration

Create a [new Application Registration](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app?WT.mc_id=AZ-MVP-5003437), and assign the SPN appropriate permissions. Then add the following `environment variables` to your application.

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`