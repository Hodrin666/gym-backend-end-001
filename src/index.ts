import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { connect } from 'mongoose';
import express from 'express';
import typeDefs from '@src/graphqlType/typeDefs';
import userResolver from '@src/resolvers/userResolver';

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

	// try {
	// 	await createConnection();
	// 	const getConn = getConnection();
	// 	console.log('Connected successfully');
	// 	const member: Member = new GymMember();
	// 	member.firstName = 'XXX';
	// 	member.lastName = 'Sobral';
	// 	member.password = 'qwerty';
	// 	member.contact = 927403165;
	// 	member.email = 'pedrosobral666@gmail.com';
	// 	member.role = 'member';
	// 	member.createdAt = Date();
	// 	// const repository = getConn.getRepository(GymMember);
	// 	try {
	// 		// console.log('Inserting');
	// 		// await repository.save(member);
	// 		// console.log('Inserted');
	// 	} catch (error) {
	// 		// console.error('Error: ', error);
	// 	}
	// } catch (error) {
	// 	console.log('error');
	// 	throw new Error('Unable to connect to db');
	// }
}

main();
