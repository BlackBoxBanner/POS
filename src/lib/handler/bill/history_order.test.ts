import { describe, expect, test, beforeEach, beforeAll, afterAll } from 'vitest';
import { faker } from '@faker-js/faker';
import { awesome } from '@dookdiks/utils';

import { createTable, deleteTable, type CreateTableProps } from '../table';
import { signUp } from '$lib/auth';
import { createBranch, deleteBranch, type CreateBranchProps } from '../branch';
import { createCustomer, type CreateCustomerProps } from '../customer';
import { supabase } from '$lib/supabase';
import { createHistory, getBill } from './checkout';


let tableProps: CreateTableProps;
let branchProps: CreateBranchProps;
let employeeProps: { id: any };
let customerProps: { id: any; branch_id?: string; check_out_at?: string | null; created_at?: string; employee_id?: string; seat?: number; table_id?: string; take_away?: boolean; }

let createID: string;

describe('History Order Unit Tests', () => {
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

        customerProps = await createCustomer({
            branch_id: branchProps.id!,
            employee_id: employeeProps.id,
            table_id: tableProps.id!,
            seat: 4
        } as CreateCustomerProps)
	});

	afterAll(async () => {
        await supabase.from('history_order').delete().eq('id', createID);
		await supabase.from('customers').delete().eq('id', customerProps.id!);

		await deleteTable({ id: tableProps.id! });
		await deleteBranch({ id: branchProps.id! });
	});

	describe('POST History Order', () => {
		test('Successful POST History Order', async () => {
			const { data, error } = await awesome.async(() =>
            createHistory({customer_id: customerProps.id!, menus:["rice"]}));

			createID = data!.id;
			expect(data!).toBeDefined();
			expect(data!.customer_id).toBe(customerProps.id!);
		});
	});

	describe('GET History Order', () => {
		test('Successful GET History Order', async () => {
			const { data, error } = await awesome.async(() => getBill({customerId: customerProps.id!}));
			expect(data).toBeDefined();

		});

	});
});
