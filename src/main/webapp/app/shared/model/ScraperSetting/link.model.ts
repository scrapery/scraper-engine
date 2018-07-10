export const enum CrawlStatus {
  SUCCESS = 'SUCCESS',
  FALSE = 'FALSE'
}

export interface ILink {
  id?: string;
  url?: string;
  scrapeDataId?: number;
  scrapeId?: number;
  currentLevel?: number;
  scrapeUrl?: string;
  parentUrl?: string;
  scrapeResultId?: number;
  scrapeResultPath?: string;
  scrapeREsultContentType?: string;
  crawlStatus?: CrawlStatus;
  internalUrl?: string;
}

export const defaultValue: Readonly<ILink> = {};
