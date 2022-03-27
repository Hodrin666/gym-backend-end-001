/**
 * Module dependencies.
 */

import { Document, Types } from 'mongoose';

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
 * Export `Member` interface.
 */

export default interface Member {
	contact: number;
	createdAt: string;
	deletedAt?: Date;
	email: string;
	firstName: string;
	_id: Types.ObjectId;
	lastName: string;
	password: string;
	role: UserRoleType;
}

/**
 * Export `InputMember` interface.
 */

export interface InputMember extends Document {
	contact: number;
	createdAt: Date;
	deletedAt?: Date;
	email: string;
	firstName: string;
	_id: Types.ObjectId;
	lastName: string;
	password: string;
	role: UserRoleType;
}

/**
 * Export `InputUpdateMember` interface.
 */

export interface InputUpdateMember extends Document {
	contact?: number;
	email?: string;
	firstName?: string;
	_id: Types.ObjectId;
	lastName: string;
}

/**
 * Export `InputLogin` interface.
 */

export interface InputLogin extends Document {
	contact: number;
	createdAt: Date;
	deletedAt?: Date;
	email: string;
	firstName: string;
	_id: Types.ObjectId;
	lastName: string;
	password: string;
	role: UserRoleType;
}

/**
 * Export `LoginMessage` interface.
 */

export interface LoginMessage {
	accessToken?: string;
	message: string;
	success: boolean;
}
