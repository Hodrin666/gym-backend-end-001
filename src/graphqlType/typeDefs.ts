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
