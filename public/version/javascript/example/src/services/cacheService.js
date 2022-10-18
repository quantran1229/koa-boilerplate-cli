import NodeCache from 'node-cache';
export default class CacheService {
  nodeCache;
  constructor() {
    this.nodeCache = new NodeCache({stdTTL: 60 * 15});
  }

  get(key) {
    return this.nodeCache.get(key);
  }

  set(key, value, ttl = 0) {
    return this.nodeCache.set(key, value, ttl);
  }

  async cache(func, key, ttl = 0) {
    let value = this.get(key);
    if (!value) {
      value = await func();
      this.set(key, value, ttl);
    }
    return value;
  }

  take(key) {
    const value = this.nodeCache.get(key);
    this.nodeCache.del(key);
    return value;
  }
}
