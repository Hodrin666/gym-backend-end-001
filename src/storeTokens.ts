/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies.
 */

import { ApolloError } from 'apollo-server-express';
import Member from '@src/types/member';
import { Types } from 'mongoose';
import UserAuthModel from '@src/schema/auth';
import UserToken from '@src/types/userToken';

/**
 * Function `storeToken`.
 */

async function storeToken(
	user: Member,
	accessToken: string,
	refreshToken: string
) {
	const userTokensFound = await UserAuthModel.findOne({
		user_id: user._id,
	});

	if (userTokensFound) {
		const oldAccessToken = userTokensFound.accessTokens.tokens;
		const oldRefreshToken = userTokensFound.refreshTokens.tokens;
		const newAccessTokens = [
			...oldAccessToken,
			{ createdAt: new Date(), isRevoked: false, token: accessToken },
		];
		const newRefreshToken = [
			...oldRefreshToken,
			{ createdAt: new Date(), isRevoked: false, token: refreshToken },
		];

		const update = {
			accessTokens: { tokens: newAccessTokens },
			refreshTokens: { tokens: newRefreshToken },
		};

		try {
			await userTokensFound.updateOne(update);
		} catch (error) {
			console.error('Error', error);
			throw new ApolloError('Token not saved on the database');
		}
	} else {
		const userAuth: UserToken = {
			_id: new Types.ObjectId(),
			accessTokens: {
				tokens: [
					{
						createdAt: new Date(),
						isRevoked: false,
						token: accessToken,
					},
				],
			},
			refreshTokens: {
				tokens: [
					{
						createdAt: new Date(),
						isRevoked: false,
						token: refreshToken,
					},
				],
			},
			user_id: user._id,
		};
		const createMember = new UserAuthModel(userAuth);

		try {
			await createMember.save();
		} catch (error) {
			console.log('error', error);
			throw new ApolloError('Token was not saved on the database');
		}
	}
}

/**
 * Export `storeToken`.
 */

export default storeToken;
