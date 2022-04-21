/**
 * Module dependencies.
 */

import { TokenExpiredError, verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';
import { Request } from 'express';

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
				if (err instanceof TokenExpiredError) {
					throw new AuthenticationError('Expired_Token');
				}

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
