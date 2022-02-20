/**
 * Module dependencies.
 */

import Member from '@src/types/member';
import { Types } from 'mongoose';
import UserModel from '@src/schema/user';

/**
 * `UserResolver` endpoints.
 */

const userResolver = {
	// Mutation: {
	// 	createUser: async (_: unknown, { member }: { member: Member }) => {
	// 		const createMember = new UserModel(member);
	// 		createMember.password =
	// 		try {
	// 			await createMember.save();
	// 		} catch (error) {
	// 			console.log('User not inserted');
	// 			throw error;
	// 		}
	// 		return 'Something went wrong';
	// 	},
	// },
	Query: {
		allUsers: async (_: unknown, { first = 0 }: { first: number }) => {
			try {
				const allMembers = await UserModel.find().limit(10).skip(first);
				return allMembers;
			} catch (error) {
				console.log('Error: ', error);
			}
			return 'Something went wrong';
		},
		user: async (_: unknown, { _id }: { _id: string }) => {
			const id = new Types.ObjectId(_id);

			try {
				const member = await UserModel.findById(id);

				return member;
			} catch (error) {
				console.log('Error', error);
			}

			return 'Something went wrong';
		},
	},
};

/**
 * Export userResolver.
 */

export default userResolver;
