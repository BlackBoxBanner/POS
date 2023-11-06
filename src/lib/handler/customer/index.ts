import type { Inserts , Tables , Updates } from "$lib/types/schema";
import { customError } from "$lib/utils/errorHandler";
import { getBranch } from '../branch';
import { supabase } from '$lib/supabase';

type Customers<T, V = Tables<'customers'>> = (props: T) => Promise<V>;

export type CreateCustomerProps = Pick<Inserts<'customers'>, 'table_number'|'employee_id'|'branch_id'>;

export const createCustomer: Customers<CreateCustomerProps> = async ({table_number,employee_id,branch_id}) => {
    //customDebug('Checking Customer', debug);
    if(!table_number || table_number === undefined)
        throw customError({id: 'table_number', message: 'Table ID not provided'});
    if(!employee_id || employee_id === undefined)
        throw customError({id: 'employee_id', message: 'No employee assigned to customer'});
    if(branch_id || branch_id === undefined)
        throw customError({id: 'branch_id', message: 'No branch assigned to customer'});
    
    const { data, error } = await supabase
		.from('customer')
		.insert({
			table_number,
			employee_id,
            branch_id
        })
		.select();
    
    if (error) throw customError({ id: 'customer_id', message: error.message });
    if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
    return data[0];
};




