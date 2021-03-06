import * as assert from 'assert';
import { ModelsBO } from '../src/bussiness';
import { IModel } from '../src/interfaces';

const getRand = () =>  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

let models = new ModelsBO();
let createdId = 0; //Store ids of created itens to update and then remove

describe('CRUD: Models', function() {
	
	describe('>>> Method create', () => {
		it('should create a new model element', () =>
			models.create({ name: getRand() }).then((created) => {
				
				createdId = created.id;
			
				assert.equal(typeof created.id, 'number');
				assert.equal(typeof created.name, 'string');
			})
		);
	});
	
	describe('>>> Method list', () => {

		it('should return an array of models', () => 
			models.list(1).then((data :  Array<IModel>) => {	
				assert.equal(typeof data, 'object');
			})
		);

		it('should return contain valid model elements', () =>
			models.list(1).then((data :  Array<IModel>) => {	
				if(data.length){
					data.forEach((model : IModel) => {
						assert.equal(typeof model.id, 'number');
						assert.equal(typeof model.name, 'string');
					});
				}else{
					console.log('WARNING: YOUR DATABASE DONT HAVE MODELS');
				}
			})
		);
	});

	describe('>>> Method get', () => {
		it('should return a valid model element', () => {
			return models.getOne(createdId).then((data : IModel) => {
				assert.equal(typeof data[0].id, 'number');
				assert.equal(typeof data[0].name, 'string');
			});
		});
	});

	describe('>>> Method update', () => {
		it(`should update the created model element`, () =>
			models.update(createdId, { name: getRand() }).then((status) => {
				assert.equal(status[0], 1);
			})
		);	
	});

	describe('>>> Method remove', () => {
		it(`should remove the created model element`, () =>
			models.remove(createdId).then((status) => {
				assert.equal(status, 1);
			})
		);	
	});
});