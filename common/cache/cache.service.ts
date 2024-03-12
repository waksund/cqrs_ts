import {Inject, Injectable} from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class CacheService{
    constructor(
        @Inject('DISTRIBUTED_CACHE') private readonly client: Redis,
    ) {
    }

    async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
        await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }

    get(key: string): Promise<string | null> {
        return this.client.get(key);
    }
}
