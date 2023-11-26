import { describe, expect, test, beforeEach, beforeAll } from "vitest";
import {faker} from '@faker-js/faker';
import { awesome } from "@dookdiks/utils";
import  { type CreateTableProps, type UpdateTableProps, type GetTableProps, type DeleteTableProps, createTable, updateTable, getTable, deleteTable } from ".";

let createID: string

let createTableProps: CreateTableProps
let updateTableProps: UpdateTableProps
let getTableProps: GetTableProps
let deleteTableProps: DeleteTableProps
let currentTableProps: UpdateTableProps

describe('Branch Unit Test', () => {

        beforeEach(()=>{
        createTableProps = { table_number: faker.number.int({ max: 20 }), seat: faker.number.int({ max: 20 })}
        updateTableProps = {
            id: createID,
            table_number: faker.number.int({ max: 20 }), 
            seat: faker.number.int({ max: 20 })
        }
        getTableProps = {id: createID}
        deleteTableProps  = {id: createID}
    })

    describe('POST Table', () => {
        test('Successful POST Table', async () => {
            const {data, error}  = await awesome.async(()=>createTable(createTableProps))

            createID = data!.id

            expect(data).toBeDefined()
            expect(data?.table_number).toBe(createTableProps.table_number)
            expect(data?.seat).toBe(createTableProps.seat)
        })
    })

    describe('PATCH Table', () => {
        test('Successful Update Table', async () => {
            const {data, error}  = await awesome.async(()=>updateTable(updateTableProps))
            
            currentTableProps = data!

            expect(data).toBeDefined()
            expect(data?.table_number).toBe(updateTableProps.table_number)
            expect(data?.seat).toBe(updateTableProps.seat)
        })
    })
    
    describe('GET Table', () => {
        test('Successful GET All Table', async () => {
            const {data, error}  = await awesome.async(()=>getTable({}))

            expect(data).toBeDefined()
        })
        test('Successful GET Specific Table', async () => {
            const {data, error}  = await awesome.async(()=>getTable(getTableProps))
            
            expect(data).toBeDefined()
            expect(data![0].id).toBe(currentTableProps.id)
            expect(data![0].table_number).toBe(currentTableProps.table_number)
            expect(data![0].seat).toBe(currentTableProps.seat)

        })
    })

    describe('DELETE Table', () => {
        test('Successful DELETE  Table', async () => {
            const {data, error}  = await awesome.async(()=>deleteTable(deleteTableProps))
            
            expect(data).toBeDefined()
            expect(data?.id).toBe(currentTableProps.id)
            expect(data?.table_number).toBe(currentTableProps.table_number)
            expect(data?.seat).toBe(currentTableProps.seat)
        })
    })

});