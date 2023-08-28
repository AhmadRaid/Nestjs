export interface CacheOptions {
  ttl?: number;
  keyPrefix?: string;
  condition?: () => boolean;
  invalidateKeys?: string[];
  cacheGroup?: string;
  fallback?: () => any;
  cacheNamespace?: string;
  cacheBusting?: boolean;
  cacheStaleness?: boolean;
  environment?: 'development' | 'production' | 'staging';
}
