export const enum Action {
  CLICK = 'CLICK',
  SCROLL = 'SCROLL',
  LOGIN = 'LOGIN',
  GET = 'GET',
  POST = 'POST'
}

export const enum SeleniumActionGetContent {
  DONE_ACTION = 'DONE_ACTION',
  EACH_ACTION = 'EACH_ACTION'
}

export interface IFetchSiteAction {
  id?: string;
  url?: string;
  domain?: string;
  host?: string;
  activeLevel?: number;
  selectorAction?: string;
  selectorActionAttr?: string;
  action?: Action;
  totalActions?: number;
  seleniumActionGetContent?: SeleniumActionGetContent;
  selectorNextPageUrlsName?: string;
  selectorNextPageUrlsNameAttr?: string;
}

export const defaultValue: Readonly<IFetchSiteAction> = {};
