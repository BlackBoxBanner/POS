import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { type } from 'os';

export type CreateBranchProps = Inserts<'branches'>;
type CreateBranch = (props: CreateBranchProps) => Promise<Tables<'branches'>>;
export const createBranch: CreateBranch = async ({ branch_name, phone_number, ...rest }) => {
	if (!branch_name || branch_name === undefined) throw new Error('Branch name not provided');
	if (!phone_number || phone_number === undefined) throw new Error('Phone number not provided');
	const { data: branchData, error: branchError } = await supabase
		.from('branches')
		.insert({
			branch_name,
			phone_number,
			...rest
		})
		.select();

	if (branchError) throw new Error(branchError.message);
	return branchData[0];
};

export type GetBranchProps = {
	id?: string;
};
type GetBranch = (props: GetBranchProps) => Promise<Inserts<'branches'>[]>;
export const getBranch: GetBranch = async ({ id }) => {
	if (id) {
		const { data, error } = await supabase.from('branches').select().eq('id', id);
		if (error) throw new Error(error.message);
		return data;
	} else {
		const { data, error } = await supabase.from('branches').select('*');
		if (error) throw new Error(error.message);
		return data;
	}
};

export type DeleteBranchProps = {
	id: string;
};
type DeleteBranch = (props: DeleteBranchProps) => Promise<Tables<'branches'>>;
export const deleteBranch: DeleteBranch = async ({ id }) => {
	if (!id || id === undefined) throw new Error('ID not provided');
	const { error, data } = await supabase.from('branches').delete().eq('id', id).select();
	if (error) throw new Error(error.message);
	return data[0];
};

export type UpdateBranchProps = Updates<'branches'>;
type UpdateBranch = (props: UpdateBranchProps) => Promise<Tables<'branches'>>;
export const updateBranch: UpdateBranch = async (props) => {
	const { data, error } = await supabase.from('branches').update(props).select();
	if (error) throw new Error(error.message);
	return data[0];
};
