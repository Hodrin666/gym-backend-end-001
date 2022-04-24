/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies.
 */

import {
	DeleteClassInput,
	EditInputGymClass,
	InputGymClass,
} from '@src/types/gymClass';
import { ApolloError } from 'apollo-server-core';
import ClassModel from '@src/schema/classes';
import { Types } from 'mongoose';
import UserModel from '@src/schema/user';

/**
 * `classResolver` endpoints.
 */

const classResolver = {
	Mutation: {
		createGymClass: async (_: unknown, { input }: { input: InputGymClass }) => {
			const gymInput = input;
			gymInput._id = new Types.ObjectId();
			gymInput.createdAt = new Date();
			const findTeacher = await UserModel.findById(input._teacherID);

			if (findTeacher) {
				gymInput.teacher = findTeacher;
			}

			// gymInput._teacherID = new Types.ObjectId(gymInput._teacherID);

			if (gymInput.members?.length) {
				// eslint-disable-next-line no-restricted-syntax
				for (let id of gymInput.members) {
					id = new Types.ObjectId(id);
				}
			}

			const gymClass = new ClassModel(gymInput);

			try {
				await gymClass.save();
				const found = await ClassModel.findById(gymInput._id);
				return {
					class: found,
					message: 'Class inserted',
					success: !!found,
				};
			} catch (error) {
				console.log('Class not inserted');
				return {
					message: error,
					success: false,
				};
			}
		},
		deleteClassById: async (
			_: unknown,
			{ input }: { input: DeleteClassInput }
		) => {
			try {
				const deleteClass = await ClassModel.findByIdAndDelete(input._id);
				if (deleteClass) {
					return {
						message: 'Class deleted successfully',
						success: true,
					};
				}
			} catch (error) {
				throw new ApolloError('Something went wrong on deleting the class');
			}

			return {
				message: 'Class not deleted',
				success: false,
			};
		},
		editGymClassById: async (
			_: unknown,
			{ input }: { input: EditInputGymClass }
		) => {
			const classInput = input;
			const gymClass = await ClassModel.findById(classInput._id);

			if (!gymClass) return { message: 'Class not found', success: false };

			try {
				const findTeacher = await UserModel.findById(input._teacherID);
				const update = {
					_teacherID: classInput._teacherID,
					date: classInput.date,
					description: classInput.description,
					members: classInput.members,
					teacher: findTeacher,
					time: classInput.time,
				};

				const updatedClass = await gymClass.updateOne(update);

				if (updatedClass) {
					const findClass = await ClassModel.findById(classInput._id);

					const message = {
						class: findClass,
						message: 'Class updated successfully',
						success: true,
					};

					return message;
				}
				throw new ApolloError('Class not found');
			} catch (error) {
				return {
					message: error,
					success: false,
				};
			}
		},
	},
	Query: {
		allClasses: async (
			_: unknown,
			{ first = 0 }: { first: number },
			context: any
		) => {
			if (!context.isAuthenticated()) return null;
			try {
				const allClasses = await ClassModel.find().limit(10).skip(first);
				return allClasses;
			} catch (error) {
				console.log('Error: ', error);
			}
			return 'Something went wrong';
		},
	},
};

/**
 * Export classResolver.
 */

export default classResolver;
