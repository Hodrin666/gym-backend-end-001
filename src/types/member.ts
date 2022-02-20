/**
 * Module dependencies.
 */

import { Schema } from 'mongoose';

/**
 * Export `UserRoleRtp` type.
 */

export type UserRoleType = 'admin' | 'teacher' | 'member';

/**
 * Export `ProfileImage` type.
 */

export type ProfileImage = {
	name: string;
	image: Buffer;
};

/**
 * Export `ProfileImage` interface.
 */

export default interface Member {
	contact: number;
	createdAt: string;
	deletedAt?: Date;
	email: string;
	firstName: string;
	_id: Schema.Types.ObjectId;
	lastName: string;
	password: string;
	role: UserRoleType;
}
