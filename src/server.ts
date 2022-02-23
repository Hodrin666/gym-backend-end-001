/**
 * Module dependencies.
 */

import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { connect } from 'mongoose';
import express from 'express';
import typeDefs from '@src/graphqlType/typeDefs';
import userResolver from '@src/resolvers/userResolver';

/**
 * Function `Main`.
 */

async function main() {
	const app = express();
	const port: number = 4000;

	const uri: string = process?.env?.DATABASE_URI
		? process?.env?.DATABASE_URI
		: '';

	try {
		await connect(uri);

		console.log('Connection sucessfull');
	} catch (error) {
		console.log('Connection not successful: ', error);
	}

	const apolloServer = new ApolloServer({
		resolvers: [userResolver],
		typeDefs,
	});

	try {
		await apolloServer.start();
		apolloServer.applyMiddleware({ app });

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
