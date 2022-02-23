/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies.
 */

import { InputMember } from '@src/types/member';
import { Types } from 'mongoose';
import UserModel from '@src/schema/user';
import bcrypt from 'bcrypt';

/**
 * `UserResolver` endpoints.
 */

const userResolver = {
	Mutation: {
		createUser: async (_: unknown, { input }: { input: InputMember }) => {
			const member = input;
			const saltRounds: number = 10;
			member.password = bcrypt.hashSync(member.password, saltRounds);
			member._id = new Types.ObjectId();
			member.createdAt = new Date();
			const createMember = new UserModel(member);

			try {
				await createMember.save();
				const found = await UserModel.findById(createMember._id);

				return {
					member: createMember,
					success: found && true,
				};
			} catch (error) {
				console.log('User not inserted');
				throw error;
			}
		},
	},
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
