import type { Tables } from '$lib/types/schema';
import { supabase, supabaseAdmin } from '$lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export type SignInProps = {
	email: string;
	password: string;
};
type SignIn = (props: SignInProps) => Promise<{ user: User; session: Session }>;
export const signIn: SignIn = async ({ email, password }) => {
	if (!email || email === undefined) throw new Error('No email provided');
	if (!password || password === undefined) throw new Error('No password provided');

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) throw new Error(error.message);
	return data;
};

export type SignUpProps = {
	email: string;
	name: string;
	password: string;
	repetePassword: string;
};
type SignUp = (props: SignUpProps) => Promise<Tables<'employees'>>;
export const signUp: SignUp = async ({ email, name, password, repetePassword }) => {
	if (!email || email === undefined) throw new Error('No email provided');
	if (!name || name === undefined) throw new Error('No name provided');
	if (!password || password === undefined) throw new Error('No password provided');
	if (!repetePassword || repetePassword === undefined)
		throw new Error('No repete password provided');
	if (password !== repetePassword) throw new Error('Password not matched');

	const { data, error: registerError } = await supabase.auth.signUp({
		email,
		password
	});

	if (registerError) throw new Error(registerError.message);
	if (!data.user) throw new Error('No user return');
	const { data: databaseReturn, error: databaseError } = await supabase
		.from('employees')
		.upsert({
			id: data.user.id,
			email,
			name
		})
		.select();

	if (databaseError) throw new Error(databaseError.message);
	return databaseReturn[0];
};

export const signUpForce: SignUp = async ({ email, name, password, repetePassword }) => {
	if (!email || email === undefined) throw new Error('No email provided');
	if (!name || name === undefined) throw new Error('No name provided');
	if (!password || password === undefined) throw new Error('No password provided');
	if (!repetePassword || repetePassword === undefined)
		throw new Error('No repete password provided');
	if (password !== repetePassword) throw new Error('Password not matched');

	const { data, error: registerError } = await supabaseAdmin.auth.admin.createUser({
		email,
		password,
		email_confirm: true,
		user_metadata: {
			name
		}
	});

	if (registerError) throw new Error(registerError.message);

	const { data: databaseReturn, error: databaseError } = await supabase
		.from('employees')
		.upsert({
			id: data.user.id,
			email,
			name
		})
		.select();

	if (databaseError) throw new Error(databaseError.message);

	return databaseReturn[0];
};

export type SignOutProps = {};
type SignOut = (props?: SignOutProps) => Promise<void>;
export const signOut: SignOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
};

export type DeleteUserProps = {
	id: string;
};
type DeleteUser = (props: DeleteUserProps) => Promise<string>;
export const deleteUser: DeleteUser = async ({ id }) => {
	if (!id || id === undefined) throw new Error('No id provided.');
	const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

	if (authError) throw new Error(authError.message);
	const { error: databaseError } = await supabase.from('employees').delete().eq('id', id);

	if (databaseError) throw new Error(databaseError.message);
	return `User ID ${id} has been deleted.`;
};

export type GetUserProps = {
	id: string | null;
};
type GetUser = (props: GetUserProps) => Promise<Tables<'employees'>[] | null>;
export const getUser: GetUser = async ({ id }) => {
	if (id) {
		let { data, error } = await supabase.from('employees').select('*').eq('id', id);
		if (error) throw new Error(error.message);
		return data;
	} else {
		let { data, error } = await supabase.from('employees').select('*');
		if (error) throw new Error(error.message);
		return data;
	}
};

export type UpdateUserProps = {
	name?: string;
};
type UpdateUser = (props: UpdateUserProps) => Promise<Tables<'employees'>>;
export const updateUser: UpdateUser = async ({ name }) => {
	if (!name || name === undefined) throw new Error('Name is not provided');

	const {
		data: { session },
		error: sessionError
	} = await supabase.auth.getSession();

	if (sessionError) throw new Error(sessionError.message);
	if (!session) throw new Error('No user signin');

	const { data, error: databaseError } = await supabase
		.from('employees')
		.update({
			name: name
		})
		.eq('id', session?.user.id)
		.select();

	if (databaseError) throw new Error(databaseError.message);

	return data[0];
};
