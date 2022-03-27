/**
 * Module dependencies.
 */

import { Types } from 'mongoose';

/**
 * Export `ProfileImage` type.
 */

export default interface UserToken {
	_id: Types.ObjectId;
	accessTokens: {
		tokens: Array<{
			token: string;
			isRevoked: boolean;
			createdAt: Date;
		}>;
	};
	refreshTokens: {
		tokens: Array<{
			token: string;
			isRevoked: boolean;
			createdAt: Date;
		}>;
	};
	user_id: Types.ObjectId;
}
