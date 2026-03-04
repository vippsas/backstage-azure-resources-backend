import { RootConfigService } from '@backstage/backend-plugin-api';

/** @public */
export class azureResourceConfig {
  constructor(
    public readonly tenantId: string,
    public readonly clientId: string,
    /**
     * @visibility secret
     */
    public readonly clientSecret: string,
  ) {}

  static fromConfig(config: RootConfigService) : azureResourceConfig | null {
    const azConfig = config.getOptionalConfig('azureResources');
    return azConfig ? new azureResourceConfig(
      azConfig.getString('tenantId'),
      azConfig.getString('clientId'),
      azConfig.getString('clientSecret'),
    ) : null;
  }
}