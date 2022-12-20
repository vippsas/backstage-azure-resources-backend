import { Config } from '@backstage/config';

/** @public */
export class AzureSitesConfig {
  constructor(
    public readonly tenantId: string,
    public readonly clientId: string,
    public readonly clientSecret: string,
  ) {}

  static fromConfig(config: Config) : AzureSitesConfig | undefined {
    const azConfig = config.getOptionalConfig('azureResources');
    return azConfig ? new AzureSitesConfig(
      azConfig.getString('AZURE_TENANT_ID'),
      azConfig.getString('AZURE_CLIENT_ID'),
      azConfig.getString('AZURE_CLIENT_SECRET'),
    ) : undefined;
  }
}