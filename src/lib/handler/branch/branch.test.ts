import { describe, expect, test, beforeEach, beforeAll } from "vitest";
import {faker} from '@faker-js/faker';
import { awesome } from "@dookdiks/utils";
import  { createBranch, updateBranch, type CreateBranchProps, type DeleteBranchProps, type GetBranchProps, type UpdateBranchProps, getBranch, deleteBranch } from ".";

let createID: string

let createBranchProps: CreateBranchProps
let updateBranchProps: UpdateBranchProps
let getBranchProps: GetBranchProps
let deleteBranchProps: DeleteBranchProps
let currentBranchProps: UpdateBranchProps

describe('Branch Unit Test', () => {

        beforeEach(()=>{
        createBranchProps = { branch_name: faker.location.city(), phone_number: faker.number.int({ max: 996787789 })}
        updateBranchProps = {
            id: createID,
            branch_name: faker.location.city(), 
            phone_number: faker.number.int({ max: 996787789 })
        }
        getBranchProps = {id: createID}
        deleteBranchProps  = {id: createID}
    })

    describe('POST Branch', () => {
        test('Successful POST Branch', async () => {
            const {data, error}  = await awesome.async(()=>createBranch(createBranchProps))

            createID = data!.id

            expect(data).toBeDefined()
            expect(data?.branch_name).toBe(createBranchProps.branch_name)
            expect(data?.phone_number).toBe(createBranchProps.phone_number)
        })
    })

    describe('PATCH Branch', () => {
        test('Successful Update Branch', async () => {
            const {data, error}  = await awesome.async(()=>updateBranch(updateBranchProps))
            
            currentBranchProps = data!

            expect(data).toBeDefined()
            expect(data?.branch_name).toBe(updateBranchProps.branch_name)
            expect(data?.phone_number).toBe(updateBranchProps.phone_number)
        })
    })
    
    describe('GET Branch', () => {
        test('Successful GET All Branch', async () => {
            const {data, error}  = await awesome.async(()=>getBranch({}))

            expect(data).toBeDefined()
        })
        test('Successful GET Specific Branch', async () => {
            const {data, error}  = await awesome.async(()=>getBranch(getBranchProps))
            
            expect(data).toBeDefined()
            expect(data![0].id).toBe(currentBranchProps.id)
            expect(data![0].branch_name).toBe(currentBranchProps.branch_name)
            expect(data![0].phone_number).toBe(currentBranchProps.phone_number)

        })
    })

    describe('DELETE Branch', () => {
        test('Successful DELETE  Branch', async () => {
            const {data, error}  = await awesome.async(()=>deleteBranch(deleteBranchProps))

            expect(data).toBeDefined()
            expect(data?.id).toBe(currentBranchProps.id)
            expect(data?.branch_name).toBe(currentBranchProps.branch_name)
            expect(data?.phone_number).toBe(currentBranchProps.phone_number)
        })
    })

});