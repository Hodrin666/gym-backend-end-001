/**
 * Module dependencies.
 */

import { Model, Schema, model } from 'mongoose';
import Member from '@src/types/member';

/**
 * `userSchema` Schema.
 */

const userSchema: Schema = new Schema<Member>(
	{
		_id: Schema.Types.ObjectId,
		contact: String,
		createdAt: String,
		deletedAt: Date,
		email: String,
		firstName: String,
		lastName: String,
		password: String,
		role: {
			default: 'member',
			enum: ['admin', 'teacher', 'member'],
			type: String,
		},
	},
	{
		versionKey: false,
	}
);

/**
 * `UserModel` Model.
 */

const UserModel: Model<Member> = model<Member>('Member', userSchema);

/**
 * Export `UserModel`.
 */

export default UserModel;
