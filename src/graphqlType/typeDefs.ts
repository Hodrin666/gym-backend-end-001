/**
 * Module dependencies.
 */

import { gql } from 'apollo-server';

/**
 * Schema.
 */

const typeDefs = gql`
	enum Role {
		admin
		member
		teacher
	}

	input memberInput {
		contact: Int!
		email: String!
		firstName: String!
		lastName: String!
		password: String!
		role: Role!
	}

	input memberUpdateInput {
		_id: ID!
		contact: Int
		email: String
		firstName: String
		lastName: String
	}

	input memberLogin {
		email: String!
		password: String!
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
		member: member
	}

	type LoginResponse {
		success: Boolean!
		accessToken: String
		message: String!
	}

	type updateMemberSuccess {
		success: Boolean!
		message: String!
		member: member
	}

	type Query {
		allUsers(first: Int): [member!]
		user(_id: ID!): member!
	}

	type Mutation {
		createUser(input: memberInput!): createMemberSuccess!
		registerUser(input: memberInput!): createMemberSuccess!
		forgotPassword(email: String!): Boolean!
		login(input: memberLogin!): LoginResponse!
		updateUser(input: memberUpdateInput): updateMemberSuccess!
	}
`;

/**
 * Export `TypeDefs`.
 */

export default typeDefs;
