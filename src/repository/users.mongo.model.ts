import { model, Schema, SchemaTypes } from 'mongoose';
import { User } from '../entities/user';

const userSchema = new Schema<User>({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  beers: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Beer',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

// Crea el modelo que permite conectar con la base de datos

export const UserModel = model('User', userSchema, 'users');
