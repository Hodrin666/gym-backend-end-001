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
		role: Role!
	}

	type gymClass {
		_id: ID!
		members: [ID]
		createdAt: String!
		deletedAt: String
		_teacherID: ID!
		teacher: member
		date: String!
		time: String!
		description: String
	}

	input classInput {
		_teacherID: ID!
		date: String!
		time: String!
		description: String
		members: [ID]
	}

	input editClassInput {
		_id: ID!
		_teacherID: ID
		date: String
		time: String
		description: String
		members: [ID]
	}

	input classDeleteInput {
		_id: ID!
	}

	type createMemberSuccess {
		success: Boolean!
		member: member
	}

	type LoginResponse {
		success: Boolean!
		accessToken: String
		refreshToken: String
		member: member!
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
		allTeachers(first: Int): [member!]
		allClasses(first: Int): [gymClass!]
	}

	type createGymClassResponse {
		success: Boolean!
		message: String!
		class: gymClass
	}

	type deleteResponse {
		success: Boolean!
		message: String!
	}

	type Mutation {
		createUser(input: memberInput!): createMemberSuccess!
		registerUser(input: memberInput!): createMemberSuccess!
		forgotPassword(email: String!): Boolean!
		login(input: memberLogin!): LoginResponse!
		updateUser(input: memberUpdateInput): updateMemberSuccess!
		deleteClassById(input: classDeleteInput!): deleteResponse!
		createGymClass(input: classInput!): createGymClassResponse!
		editGymClassById(input: editClassInput!): createGymClassResponse!
		createBulkGymClass(input: [classInput!]): createGymClassResponse!
	}
`;

/**
 * Export `TypeDefs`.
 */

export default typeDefs;
