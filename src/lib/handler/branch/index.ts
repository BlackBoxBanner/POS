import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customDebug, customError } from '@dookdiks/error';

export type CreateBranchProps = Inserts<'branches'> & {
	debug?: boolean;
};
type CreateBranch = (props: CreateBranchProps) => Promise<Tables<'branches'>>;
/**
 * Creates a new branch with the provided branch name and phone number.
 * @param {Object} options - The options for creating a branch.
 * @param {string} options.branch_name - The name of the branch.
 * @param {string} options.phone_number - The phone number associated with the branch.
 * @param {boolean} [options.debug] - Whether to enable debug mode.
 * @param {any} [options.rest] - Additional properties to be inserted into the branch.
 * @returns {Promise<Object>} - A promise that resolves to the created branch data.
 * @throws {Error} - If the branch name or phone number is not provided.
 * @throws {Error} - If there is an error during the branch creation.
 * @throws {Error} - If no matched ID is found.
 */
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
/**
 * Retrieves a branch from the database based on the provided ID.
 * If no ID is provided, retrieves all branches.
 *
 * @param {Object} options - The options for retrieving the branch.
 * @param {string} options.id - The ID of the branch to retrieve (optional).
 * @param {boolean} options.debug - Flag indicating whether to enable debug mode (optional).
 * @returns {Promise<Object[]>} - A promise that resolves to an array of branch objects.
 * @throws {CustomError} - If there is an error retrieving the branch.
 */
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
/**
 * Deletes a branch by ID.
 * @param {Object} options - The options object.
 * @param {string} options.id - The ID of the branch to delete.
 * @param {boolean} [options.debug] - Whether to enable debug mode.
 * @returns {Promise<Object>} The deleted branch object.
 * @throws {Error} If the ID is not provided.
 * @throws {Error} If there is an error during deletion.
 * @throws {Error} If no branch with the provided ID is found.
 */
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
/**
 * Updates a branch in the database.
 *
 * @param {Object} options - The options for updating the branch.
 * @param {string} options.id - The ID of the branch to update.
 * @param {boolean} options.debug - Flag indicating whether to enable debug mode.
 * @param {Object} props - The properties to update on the branch.
 * @returns {Promise<Object>} - The updated branch object.
 * @throws {Error} - If no ID is provided or if there is an error during the update.
 */
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
