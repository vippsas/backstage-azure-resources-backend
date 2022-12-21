import { Config } from '@backstage/config';

/** @public */
export class azureResourceConfig {
  constructor(
    public readonly tenantId: string,
    public readonly clientId: string,
    public readonly clientSecret: string,
  ) {}

  static fromConfig(config: Config) : azureResourceConfig | null {
    const azConfig = config.getOptionalConfig('azureResources');
    return azConfig ? new azureResourceConfig(
      azConfig.getString('AZURE_TENANT_ID'),
      azConfig.getString('AZURE_CLIENT_ID'),
      azConfig.getString('AZURE_CLIENT_SECRET'),
    ) : null;
  }
}