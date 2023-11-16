import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customDebug, customError } from '@dookdiks/error';

export type CreateBranchProps = Inserts<'branches'> & {
	debug?: boolean;
};
type CreateBranch = (props: CreateBranchProps) => Promise<Tables<'branches'>>;
export const createBranch: CreateBranch = async ({ branch_name, phone_number, debug, ...rest }) => {
	customDebug('Checking branch_name', debug);
	if (!branch_name || branch_name === undefined)
		throw customError({ id: 'branch_name', message: 'Branch name not provided' });

	customDebug('Checking phone_number', debug);
	if (!phone_number || phone_number === undefined)
		throw customError({ id: 'phone_number', message: 'Phone number not provided' });

	customDebug('Create branch', debug);
	const { data: branchData, error: branchError } = await supabase
		.from('branches')
		.insert({
			branch_name,
			phone_number,
			...rest
		})
		.select();

	customDebug('Check error', debug);
	if (branchError) throw customError({ id: 'branch_name', message: branchError.message });
	if (branchData.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return branchData[0];
};

export type GetBranchProps = {
	id?: string;
	debug?: boolean;
};
type GetBranch = (props: GetBranchProps) => Promise<Inserts<'branches'>[]>;
export const getBranch: GetBranch = async ({ id, debug }) => {
	customDebug('Check ID', debug);
	const func = id
		? supabase.from('branches').select().eq('id', id)
		: supabase.from('branches').select('*');

	const { data, error } = await func;
	if (error) throw customError({ id: 'id', message: error.message });
	return data;
};

export type DeleteBranchProps = {
	id: string;
	debug?: boolean;
};
type DeleteBranch = (props: DeleteBranchProps) => Promise<Tables<'branches'>>;
export const deleteBranch: DeleteBranch = async ({ id, debug }) => {
	customDebug('Check ID', debug);
	if (!id || id === undefined) throw customError({ id: 'id', message: 'ID not provided' });

	customDebug('Running delete func', debug);
	const { error, data } = await supabase.from('branches').delete().eq('id', id).select();

	customDebug('Check error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export type UpdateBranchProps = Updates<'branches'> & {
	id: string;
	debug?: boolean;
};
type UpdateBranch = (props: UpdateBranchProps) => Promise<Tables<'branches'>>;
export const updateBranch: UpdateBranch = async ({ id, debug, ...props }) => {
	customDebug('Check id', debug);
	if (!id) throw customError({ id: 'id', message: 'No id provided' });

	customDebug('Run update data', debug);
	const { data, error } = await supabase.from('branches').update(props).eq('id', id).select();

	customDebug('Check error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};
