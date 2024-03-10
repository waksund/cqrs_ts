"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: 'postgres://postgres:1@localhost:5432/cqrs_ts',
    synchronize: false,
    logging: true,
    entities: ['apps/spaghetti/src/common/entities/*.entity{.ts,.js}'],
});
//# sourceMappingURL=ormconfig.js.map