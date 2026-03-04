# Azure resources backend plugin

The backend API plugin used by the frontend plugin. This plugin wraps a few Azure Resource Graph queries to pull information about your Azure resources in relation to a Backstage entity.

## Getting started

Add the package to your Backstage backend:

```bash
# From the Backstage root directory
cd packages/backend
yarn add @vippsno/plugin-azure-resources-backend
```

Register the plugin in `packages/backend/src/index.ts`:

```typescript
const backend = createBackend();

// ... other plugins ...

backend.add(import('@vippsno/plugin-azure-resources-backend'));

backend.start();
```

## Authentication with Azure

The plugin needs an identity with `read` access at the scope you want to query. It uses `@azure/identity`, which supports both managed identity and app registration authentication.

### Using managed identity (recommended)

If your Backstage instance runs on an Azure resource that supports managed identity, no configuration is needed. Assign the managed identity `Reader` permissions on the relevant resource groups, subscriptions, or management groups.

### Using app registration

Create a [new App Registration](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app), assign it `Reader` permissions, then add the following to your `app-config.yaml` or `app-config.local.yaml`:

```yaml
azureResources:
  tenantId: f02ae3d3-be5c-4b9d-9d6e-8192055d4083
  clientId: ab77a497-102e-4c4d-9853-3aca7e733245
  clientSecret: ~AcbyiAM2YUMQwUSqhzg
```

If no `azureResources` config is present, the plugin falls back to `DefaultAzureCredential` (managed identity / Azure CLI for local dev).

## API endpoints

All endpoints are served under `/api/azure-resources/`.

| Endpoint | Description |
|---|---|
| `GET /health` | Health check |
| `GET /rg/:tagKey/:tagValue` | Resource groups matching a tag |
| `GET /rg/:tagKey/:tagValue/secrecommendations` | Unhealthy security assessments for matching resource groups |
| `GET /rg/:tagKey/:tagValue/costadvice` | Azure Advisor cost recommendations for matching resource groups |

## Migrating from the old backend system

If you were using v1.x with the legacy Backstage backend, replace the old wiring with the single `backend.add()` call shown above and remove the plugin file at `packages/backend/src/plugins/azure-resources-backend.ts`.
