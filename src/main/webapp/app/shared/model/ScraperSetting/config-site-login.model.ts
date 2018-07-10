export interface IConfigSiteLogin {
  id?: string;
  url?: string;
  domain?: string;
  host?: string;
  selectorAction?: string;
  selectorUsername?: string;
  selectorPassword?: string;
  selectorButtonLogin?: string;
  username?: string;
  password?: string;
  redirectUrl?: string;
}

export const defaultValue: Readonly<IConfigSiteLogin> = {};
