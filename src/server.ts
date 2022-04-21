/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies.
 */

import 'reflect-metadata';
import 'dotenv/config';
import { Types, connect } from 'mongoose';
import accessTokenGenerator, { refreshTokenGenerator } from '@src/auth';
import express, { NextFunction, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import UserModel from '@src/schema/user';
import classResolver from '@src/resolvers/classResolver';
import cookieParser from 'cookie-parser';
import isAuthenticated from '@src/middleware/auth';
import typeDefs from '@src/graphqlType/typeDefs';
import userResolver from '@src/resolvers/userResolver';
import { verify } from 'jsonwebtoken';

/**
 * Function `Main`.
 */

async function main() {
	const app = express();
	const port: number = 4000;

	const uri: string = process?.env?.DATABASE_URI
		? process?.env?.DATABASE_URI
		: '';

	const cors = {
		credentials: true,
		origin: 'https://studio.apollographql.com',
	};

	try {
		await connect(uri);

		console.log('Connection sucessfull');
	} catch (error) {
		console.log('Connection not successful: ', error);
	}

	app.use(cookieParser());

	app.post(
		'/refresh_token',
		async (req: Request, res: Response, next: NextFunction) => {
			let token = req.headers.authorization;

			if (!token) {
				res.send({ accessToken: '', ok: false });
				return next();
			}

			token = token.split('Bearer')[1].trim();

			const secret = process.env.REFRESH_JWT_SECRET || '';
			let payload: any = null;
			try {
				payload = verify(token, secret);
			} catch (error) {
				console.error(error);
				res.send({ accessToken: '', ok: false });
				return next();
			}

			const { _id }: { _id: Types.ObjectId } = payload;

			const user = await UserModel.findById(_id);

			if (!user) {
				res.send({ accessToken: '', ok: false });
				return next();
			}

			res.send({
				accessToken: accessTokenGenerator(user),
				ok: true,
				refreshToken: refreshTokenGenerator(user),
			});
			return next();
		}
	);

	const apolloServer = new ApolloServer({
		context: async ({ req, res }: { req: Request; res: Response }) => ({
			isAuthenticated: () => isAuthenticated(req),
			req,
			res,
		}),
		introspection: true,
		resolvers: [userResolver, classResolver],
		typeDefs,
	});

	try {
		await apolloServer.start();
		apolloServer.applyMiddleware({ app, cors });

		app.listen(port, () => {
			console.log(
				`🚀Express server started at port http://localhost:${port}/graphql`
			);
		});
	} catch (error) {
		console.log(error);
	}
}

main();
