/**
 * Module dependencies.
 */

import { gql } from 'apollo-server';

/**
 * TypeDefs.
 */

const typeDefs = gql`
	enum Role {
		admin
		member
		teacher
	}

	input memberInput {
		contact: Int!
		createdAt: String!
		deletedAt: String
		email: String!
		firstName: String!
		_id: ID!
		lastName: String!
		password: String!
		role: [Role]!
	}

	type member {
		contact: Int!
		createdAt: String!
		deletedAt: String
		email: String!
		firstName: String!
		_id: ID!
		lastName: String!
		password: String!
		role: [Role]!
	}

	type createMemberSuccess {
		success: Boolean!
		message: String
		member: member
	}

	type Query {
		allUsers(first: Int): [member!]
		user(_id: ID!): member!
	}

	type Mutation {
		createUser(input: memberInput!): createMemberSuccess!
	}
`;

/**
 * Export `TypeDefs`.
 */

export default typeDefs;
