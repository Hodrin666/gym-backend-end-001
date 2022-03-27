/**
 * Module dependencies.
 */

import { AuthenticationError } from 'apollo-server-core';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

/**
 * Function `isAuthenticated`.
 */

function isAuthenticated(req: Request) {
	const authHeader = req.headers.authorization;
	const secret = process.env.JWT_SECRET || 'UNSAFE_STRING';

	if (authHeader) {
		const token = authHeader.split('Bearer')[1].trim();
		if (token) {
			try {
				const user = verify(token, secret);
				return user;
			} catch (err) {
				throw new AuthenticationError('Invalid/Expired Token');
			}
		}
		throw new Error('Authentication token must be Bearer [token]');
	}
	throw new Error('Authorization header must be provided');
}

/**
 * Export `isAuthenticated` function.
 */

export default isAuthenticated;
