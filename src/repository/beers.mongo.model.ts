import { model, Schema, SchemaTypes } from 'mongoose';
import { transform } from 'typescript';
import { Beer } from '../entities/beer.js';

const beerSchema = new Schema<Beer>({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
});

beerSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const BeerModel = model('Beer', beerSchema, 'beers'); // Crea el modelo que permite conectar con la base de datos
