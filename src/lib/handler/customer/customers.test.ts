import { describe, expect, test, beforeEach, beforeAll, afterAll } from "vitest";
import {faker} from '@faker-js/faker';
import { awesome } from "@dookdiks/utils";

import { createTable, deleteTable, type CreateTableProps } from "../table";
import { signUp } from "$lib/auth";
import { createBranch, deleteBranch, type CreateBranchProps } from "../branch";
import { createCustomer, updateCustomer, type CreateCustomerProps, getCustomer } from ".";

let tableProps: CreateTableProps
let branchProps: CreateBranchProps
let employeeProps: { id: any; }
let createID: string
let createCustomerProps: CreateCustomerProps

describe('Customer Unit Tests', () => {

    beforeAll(async ()=>{
        tableProps = await createTable({table_number: faker.number.int({max: 99}), seat: faker.number.int({max: 99})} as CreateTableProps)
        branchProps = await createBranch({ branch_name: faker.location.city(), phone_number: faker.number.int({ max: 996787789 })} as CreateBranchProps)
        employeeProps = await signUp({ 
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password : "admin",
            repetePassword: "admin",
            debug: false,
            force: true 
        })


    })

    afterAll(async ()=>{
        await deleteTable({id: tableProps.id!})
        await deleteBranch({id: branchProps.id!})
    })

    describe('POST Customers', () => {
        test('Successful POST Customers', async () => {
            console.log(branchProps.id)
            console.log(employeeProps.id)
            console.log(tableProps.id)
            const {data, error}  = await awesome.async(()=>createCustomer({branch_id: branchProps.id!,
                 employee_id: employeeProps.id, 
                 table_id: tableProps.id!}))

            createID = data!.id

            expect(data!).toBeDefined()
            expect(data!.branch_id).toBe(branchProps.id)
            expect(data!.table_id).toBe(tableProps.id)
            expect(data!.employee_id).toBe(employeeProps.id)
        })
    })

    describe('PATCH Customers', () => {
        test('Successful Update Customers', async () => {
            const {data, error}  = await awesome.async(()=>updateCustomer({id: createID, take_away: true}))
            
            expect(data).toBeDefined()
            expect(data?.take_away).toBe(true)
            expect(data!.branch_id).toBe(branchProps.id)
            expect(data!.table_id).toBe(tableProps.id)
            expect(data!.employee_id).toBe(employeeProps.id)

        })
    })

    // describe('GET Customers', () => {
    //     test('Successful GET All Order', async () => {
    //         const {data, error}  = await awesome.async(()=>getCustomer({}))

    //         expect(data).toBeDefined()
    //     })
    //     test('Successful GET Specific Order', async () => {
    //         const {data, error}  = await awesome.async(()=>getCustomer({id: createID}))

    //         expect(data).toBeDefined()
    //         expect(data![0].id).toBe(createID)
    //         expect(data![0].table_id).toBe(tableProps.id)

    //     })
    // })

    // describe('DELETE Order', () => {
    //     test('Successful DELETE Order', async () => {
    //         const {data, error}  = await awesome.async(()=>deleteOrder(deleteOrderProps))

    //         expect(data).toBeDefined()
    //         expect(data).toBe("successfully delete order")
    //     })
    // })

})