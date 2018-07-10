import { IConfigMapping } from './config-mapping.model';
import { IConfigSiteLogin } from './config-site-login.model';

export const enum FetchEngine {
  SELENIUM = 'SELENIUM',
  HTTP = 'HTTP',
  RSS = 'RSS'
}

export interface IConfigSite {
  id?: string;
  url?: string;
  name?: string;
  host?: string;
  configName?: string;
  totalLevel?: number;
  userId?: number;
  fetchEngine?: FetchEngine;
  mappings?: IConfigMapping[];
  loginActions?: IConfigSiteLogin[];
}

export const defaultValue: Readonly<IConfigSite> = {};
