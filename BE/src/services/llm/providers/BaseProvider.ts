// BaseProvider.ts

import type { ModelInfo } from "../types.js";

export abstract class BaseProvider {
  protected modelsCache: ModelInfo[] | null = null;
  protected cacheExpiresAt = 0;

  protected abstract readonly CACHE_TTL: number;

  protected sortModels(models: ModelInfo[]): void {
    models.sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;

      return a.name.localeCompare(b.name);
    });
  }

  protected hasValidCache(): boolean {
    return this.modelsCache !== null && Date.now() < this.cacheExpiresAt;
  }

  protected updateCache(models: ModelInfo[]): void {
    this.modelsCache = models;
    this.cacheExpiresAt = Date.now() + this.CACHE_TTL;
  }
}