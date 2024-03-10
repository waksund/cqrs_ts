import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {config} from "../config/config";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory() {
                console.log(__dirname)
                return {
                    type: 'postgres',
                    url: config.get('db.url'),
                    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
                    synchronize: false,
                    logging: config.get('db.logging'),
                    migrationsRun: true,
                    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
                };
            },
        }),
    ],
    providers: [
    ]
})
export class DataBaseModule {}
