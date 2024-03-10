import {createProfiguration} from "@golevelup/profiguration";

type Config = {
    db: {
        url: string;
        logging: boolean;
    };
    redis: {
        host: string;
        port: number;
        password: string;
        keyPrefix: string;
    };
    code: {
        ttlSec: number;
    };
    app: {
        port: number;
    };
};

export const config = createProfiguration<Config>(
    {
        db: {
            url: {
                default: null,
                format: '*',
                env: 'DB_URL',
            },
            logging: {
                default: false,
                format: Boolean,
                env: 'DB_LOGGING',
            },
        },
        redis: {
            host: {
                default: '',
                format: String,
                env: 'REDIS_HOST',
            },
            port: {
                default: 6379,
                format: 'port',
                env: 'REDIS_PORT',
            },
            password: {
                default: '',
                format: String,
                env: 'REDIS_PASSWORD',
            },
            keyPrefix: {
                default: 'sqrs-example',
                format: String,
                env: 'REDIS_KEY_PREFIX',
            },
        },
        code: {
            ttlSec: {
                default: 60,
                format: 'int',
                env: 'CODE_TTL_SEC',
            },
        },
        app: {
            port: {
                default: 3000,
                format: 'port',
                env: 'APP_PORT',
            },
        },
    },
    {
        strict: false,
        configureEnv: (env = 'local') => ({
            strict: false,
            files: [
                `.env.${env}`,
            ],
        }),
    },
);
