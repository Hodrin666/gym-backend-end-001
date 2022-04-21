/**
 * Module dependencies.
 */

import { Model, Schema, Types, model } from 'mongoose';
import GymClass from '@src/types/gymClass';

/**
 * `classSchema` Schema.
 */

const classSchema: Schema = new Schema<GymClass>(
	{
		_id: Types.ObjectId,
		_teacherID: Types.ObjectId,
		createdAt: String,
		date: String,
		deletedAt: Date,
		description: String,
		members: [Types.ObjectId],
		teacher: {},
		time: String,
	},
	{
		versionKey: false,
	}
);

/**
 * `ClassModel` Model.
 */

const ClassModel: Model<GymClass> = model<GymClass>('Classes', classSchema);

/**
 * Export `ClassModel`.
 */

export default ClassModel;
