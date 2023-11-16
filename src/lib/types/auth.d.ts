import { User, Session } from '@supabase/supabase-js';

type SignInProps = {
	email: string;
	password: string;
	debug?: boolean;
};
type SignIn = (props: SignInProps) => Promise<{ user: User; session: Session }>;

type SignUpProps = {
	email: string;
	name: string;
	password: string;
	repetePassword: string;
	debug?: boolean;
	force?: boolean;
};
type SignUp = (props: SignUpProps) => Promise<Tables<'employees'>>;

type SignOutProps = {
	debug?: boolean;
};
type SignOut = (props: SignOutProps) => Promise<string>;

type DeleteUserProps = {
	id: string;
	debug?: boolean;
};
type DeleteUser = (props: DeleteUserProps) => Promise<Tables<'employees'>>;

type GetUserProps = {
	id?: string | null;
	email?: string | null;
	debug?: boolean;
};
type GetUser = (props: GetUserProps) => Promise<Tables<'employees'>[] | null>;

type UpdateUserProps = {
	email?: string
	name?: string;
	debug?: boolean;
};
type UpdateUser = (props: UpdateUserProps) => Promise<Tables<'employees'>>;
