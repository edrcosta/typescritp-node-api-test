import { INTEGER, STRING } from 'sequelize';

export const brandsSchema = {
	id: {
		allowNull: false,
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type : STRING,
		allowNull : false,
		trim: true,
        unique: true,
		validate: {
			notNull: { msg: "name field is required" },
		}
	}
};