/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies.
 */

import {
	InputLogin,
	InputMember,
	InputUpdateMember,
	LoginMessage,
} from '@src/types/member';
import accessTokenGenerator, { refreshTokenGenerator } from '@src/auth';
import { compare, hashSync } from 'bcrypt';
import { createTransport, getTestMessageUrl } from 'nodemailer';
import { ApolloError } from 'apollo-server-core';
import { Types } from 'mongoose';
import UserModel from '@src/schema/user';
import storeToken from '@src/storeTokens';

/**
 * `UserResolver` endpoints.
 */

const userResolver = {
	Mutation: {
		createUser: async (
			_: unknown,
			{ input }: { input: InputMember },
			context: any
		) => {
			if (!context.isAuthenticated()) return null;

			const member = input;
			const saltRounds: number = 10;
			member.password = hashSync(member.password, saltRounds);
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
		forgotPassword: async (_: unknown, { email }: { email: string }) => {
			try {
				const userFound = await UserModel.findOne({ email });

				console.log('User', userFound);

				if (userFound) {
					const pass = process.env.STORE_EMAIL_PASSWORD || '';
					const storeEmail = process.env.STORE_EMAIL || '';
					const service = process.env.STORE_SERVICE || '';

					const transporter = createTransport({
						auth: {
							pass,
							user: storeEmail,
						},
						service,
					});

					try {
						const info = await transporter.sendMail({
							from: storeEmail, // sender address
							subject: 'Hello ✔', // Subject line
							text: 'Hello world?', // plain text body
							to: email, // list of receivers
						});

						console.log('Message sent: %s', info.messageId);
						// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

						// Preview only available when sending through an Ethereal account
						console.log('Preview URL: %s', getTestMessageUrl(info));
						// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
						return true;
					} catch (error) {
						throw new ApolloError('Email not sent');
					}
				}
			} catch (error) {
				throw new ApolloError('User does not exist');
			}
			return {
				message: 'User does not exist',
			};
		},
		login: async (
			_: unknown,
			{ input }: { input: InputLogin }
		): Promise<LoginMessage> => {
			const { email }: { email: string } = input;
			const { password }: { password: string } = input;

			try {
				const user = await UserModel.findOne({ email }).exec();

				if (user?.password) {
					const loggedin = await compare(password, user?.password);

					if (loggedin) {
						const accessToken = accessTokenGenerator(user);
						const refreshToken = refreshTokenGenerator(user);

						try {
							await storeToken(user, accessToken, refreshToken);
						} catch (error) {
							console.log('Error', error);
							throw new ApolloError('Token not stored');
						}

						return {
							accessToken,
							member: user,
							message: 'You are authenticated',
							refreshToken,
							success: loggedin,
						};
					}
				}
			} catch (error) {
				console.error(error);
				throw new Error('Email or password are wrong');
			}
			return {
				message: 'User not authenticated',
				success: false,
			};
		},
		registerUser: async (_: unknown, { input }: { input: InputMember }) => {
			const member = input;
			const saltRounds: number = 10;
			member.password = hashSync(member.password, saltRounds);
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
		updateUser: async (_: unknown, { input }: { input: InputUpdateMember }) => {
			const member = input;
			const user = await UserModel.findById(member._id);

			if (!user) return { message: 'User not found', success: false };

			console.log('input', input);

			try {
				const update = {
					contact: input.contact,
					email: input.email,
					firstName: input.firstName,
					lastName: input.lastName,
				};

				const upatedMember = await user.updateOne(update);

				if (upatedMember) {
					const updatedUser = await UserModel.findById(member._id);

					return {
						member: updatedUser,
						message: 'Member updated successfully',
						success: true,
					};
				}
				throw new ApolloError('User not found');
			} catch (error) {
				throw new ApolloError('Member not updated!');
			}
		},
	},
	Query: {
		allTeachers: async (
			_: unknown,
			{ first = 0 }: { first: number },
			context: any
		) => {
			if (!context.isAuthenticated()) return null;
			try {
				const allTeachers = await UserModel.find({ role: 'teacher' })
					.limit(10)
					.skip(first);
				return allTeachers;
			} catch (error) {
				console.log('Error: ', error);
			}
			return 'Something went wrong';
		},
		allUsers: async (
			_: unknown,
			{ first = 0 }: { first: number },
			context: any
		) => {
			if (!context.isAuthenticated()) return null;
			try {
				const allMembers = await UserModel.find().limit(10).skip(first);
				return allMembers;
			} catch (error) {
				console.log('Error: ', error);
			}
			return 'Something went wrong';
		},
		user: async (_: unknown, { _id }: { _id: string }, context: any) => {
			if (!context.isAuthenticated()) return null;
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
