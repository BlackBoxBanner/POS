import { describe, expect, test, beforeEach, beforeAll, afterAll } from 'vitest';
import { faker } from '@faker-js/faker';
import { awesome } from '@dookdiks/utils';

import { createTable, deleteTable, type CreateTableProps } from '../table';
import { signUp } from '$lib/auth';
import { createBranch, deleteBranch, type CreateBranchProps } from '../branch';
import { createCustomer, updateCustomer, type CreateCustomerProps, getCustomer } from '.';
import { supabase } from '$lib/supabase';

let tableProps: CreateTableProps;
let branchProps: CreateBranchProps;
let employeeProps: { id: any };
let createID: string;

describe('Customer Unit Tests', () => {
	beforeAll(async () => {
		tableProps = await createTable({
			table_number: faker.number.int({ max: 99 }),
			seat: faker.number.int({ max: 99 })
		} as CreateTableProps);
		branchProps = await createBranch({
			branch_name: faker.location.city(),
			phone_number: faker.number.int({ max: 996787789 })
		} as CreateBranchProps);
		employeeProps = await signUp({
			email: faker.internet.email(),
			name: faker.person.fullName(),
			password: 'admin',
			repetePassword: 'admin',
			debug: false,
			force: true
		});
	});

	afterAll(async () => {
		const { data, error } = await supabase.from('customers').delete().eq('id', createID);

		await deleteTable({ id: tableProps.id! });
		await deleteBranch({ id: branchProps.id! });

        
	});

	describe('POST Customers', () => {
		test('Successful POST Customers', async () => {
			const { data, error } = await awesome.async(() =>
				createCustomer({
					branch_id: branchProps.id!,
					employee_id: employeeProps.id,
					table_id: tableProps.id!,
					seat: 4
				})
			);

			createID = data!.id;
			console.log(typeof data);
			expect(data!).toBeDefined();
			expect(data!.branch_id).toBe(branchProps.id);
			expect(data!.table_id).toBe(tableProps.id);
			expect(data!.employee_id).toBe(employeeProps.id);
			expect(data!.seat).toBe(4);
		});
	});

	describe('PATCH Customers', () => {
		test('Successful Update Customers', async () => {
			const { data, error } = await awesome.async(() =>
				updateCustomer({ id: createID, take_away: true })
			);

			expect(data).toBeDefined();
			expect(data?.take_away).toBe(true);
			expect(data!.branch_id).toBe(branchProps.id);
			expect(data!.table_id).toBe(tableProps.id);
			expect(data!.employee_id).toBe(employeeProps.id);
		});
	});

	describe('GET Customers', () => {
		test('Successful GET All Customers', async () => {
			const { data, error } = await awesome.async(() => getCustomer({}));

			expect(data).toBeDefined();
		});
		test('Successful GET Specific Customers', async () => {
			const { data, error } = await awesome.async(() => getCustomer({ id: createID }));

			expect(data).toBeDefined();
			expect(data![0].id).toBe(createID);
			expect(data![0].table_id).toBe(tableProps.id);
		});
	});
});
