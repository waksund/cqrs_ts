import {DynamicModule, Module} from "@nestjs/common";
import {CacheService} from "./cache.service";
import Redis, {RedisOptions} from "ioredis";

@Module({})
export class CacheModule {
    static forRootAsync({useFactory: getConfig}: {
        useFactory: () => RedisOptions | Promise<RedisOptions>
    }): DynamicModule {
        return {
            module: CacheModule,
            global: true,
            providers: [
                CacheService,
                {
                    provide: 'DISTRIBUTED_CACHE',
                    async useFactory() {
                        const redisOptions = await getConfig();

                        return new Redis(redisOptions);
                    },
                }
            ],
            exports: [
                CacheService,
            ],
        };
    }
}
