/**
 * Module dependencies.
 */

import Member from '@src/types/member';
import { Types } from 'mongoose';

/**
 * GymClass interface.
 */

export default interface GymClass {
	_id: Types.ObjectId;
	members?: [Types.ObjectId];
	createdAt: string;
	deletedAt?: Date;
	_teacherID: Types.ObjectId;
	teacher: Member;
	date: string;
	time: string;
	description?: string;
}

export interface InputGymClass {
	_id: Types.ObjectId;
	members?: [Types.ObjectId];
	createdAt: Date;
	deletedAt?: Date;
	_teacherID: Types.ObjectId;
	teacher: Member;
	date: string;
	time: string;
	description?: string;
}

export interface EditInputGymClass {
	_id: Types.ObjectId;
	members?: [Types.ObjectId];
	createdAt?: Date;
	deletedAt?: Date;
	_teacherID?: Types.ObjectId;
	date?: string;
	time?: string;
	description?: string;
}

export interface DeleteClassInput {
	_id: Types.ObjectId;
}
