/**
 * Module dependencies.
 */

import { Model, Schema, Types, model } from 'mongoose';
import UserToken from '@src/types/userToken';

/**
 * Schema `userSchema`.
 */

const userAuthSchema: Schema = new Schema<UserToken>(
	{
		_id: Types.ObjectId,
		accessTokens: {
			tokens: [
				{
					createdAt: Date,
					isRevoked: Boolean,
					token: String,
				},
			],
		},
		refreshTokens: {
			tokens: [
				{
					createdAt: Date,
					isRevoked: Boolean,
					token: String,
				},
			],
		},
		user_id: Types.ObjectId,
	},
	{
		versionKey: false,
	}
);

/**
 * Model `UserModel`.
 */

const UserAuthModel: Model<UserToken> = model<UserToken>(
	'authTokens',
	userAuthSchema
);

/**
 * Export `UserModel`.
 */

export default UserAuthModel;
