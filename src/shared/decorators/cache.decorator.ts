import { SetMetadata } from '@nestjs/common';

import { CacheOptions } from '../interfaces/cache-options.interface';

export const CACHE_OPTIONS_METADATA = 'cache_options';

export const Cache = (options: CacheOptions = {}) =>
  SetMetadata(CACHE_OPTIONS_METADATA, options);
