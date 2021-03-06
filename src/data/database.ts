import { Sequelize } from 'sequelize';
import { Config } from '../helpers';
import { IConfig } from '../interfaces';

import { modelSchema, brandsSchema, vehicleSchema } from './models';

export class Database {
    
    private connection : Sequelize;
    
    public config : IConfig;
    public tables : any;

    constructor(){

        const tableConfig = {
            timestamps: false,
            underscored: true
        };

        this.config = Config.get();

        this.connection = new Sequelize(this.config.database, {
            dialect : 'mysql',
            logging : false,
        });

        this.tables = {
            models : this.connection.define('models', modelSchema, tableConfig),
            brands : this.connection.define('brands', brandsSchema, tableConfig),
            vehicles : this.connection.define('vehicles', vehicleSchema, tableConfig),
        }

        this.tables.models.hasOne(this.tables.vehicles, { forengKey: 'model_id', targetKey : 'id' });
        this.tables.vehicles.belongsTo(this.tables.models, { forengKey: 'model_id', targetKey : 'id' });

        this.tables.brands.hasOne(this.tables.vehicles, { forengKey: 'model_id', targetKey : 'id' });
        this.tables.vehicles.belongsTo(this.tables.brands, { forengKey: 'model_id', targetKey : 'id' });

    }
}