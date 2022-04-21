/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies.
 */
import Member from '@src/types/member';
import { sign } from 'jsonwebtoken';

/**
 * Export `refreshTokenGenerator` function.
 */

export function refreshTokenGenerator(member: Member) {
	if (process.env.REFRESH_JWT_SECRET) {
		const token = sign(
			{ _id: member._id, role: member.role },
			process.env.REFRESH_JWT_SECRET,
			{ expiresIn: '30d' }
		);
		return token;
	}
	return 'Something went wrong';
}

/**
 * Export `accessTokenGenerator` function.
 */

export default function accessTokenGenerator(member: Member) {
	if (process.env.JWT_SECRET) {
		const token = sign(
			{ _id: member._id, role: member.role },
			process.env.JWT_SECRET,
			{ expiresIn: '30m' }
		);
		return token;
	}
	return 'Something went wrong';
}
