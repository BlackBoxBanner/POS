import { describe, expect, test, beforeEach, beforeAll, afterAll } from "vitest";
import {faker} from '@faker-js/faker';
import { awesome } from "@dookdiks/utils";

import { createTable, deleteTable, type CreateTableProps } from "../table";
import { createMenu, deleteMenu, type CreateMenuProps } from "../menu";
import { createOrder, updateOrder, type CreateOrderProps, type UpdateOrderProps, getOrders, type GetOrdersProps, type DeleteOrderProps, deleteOrder } from ".";


let createID: string
let tableProps: CreateTableProps
let menuProps: CreateMenuProps

let createOrderProps: CreateOrderProps
let updateOrderProps: UpdateOrderProps
let getOrderProps: GetOrdersProps
let deleteOrderProps: DeleteOrderProps

describe('Order Unit Tests', () => {

    beforeAll(async()=> {
        tableProps = await createTable({table_number: faker.number.int({max: 99}), seat: faker.number.int({max: 99})} as CreateTableProps)

        menuProps = await createMenu({ name: faker.vehicle.model(), price: 452 } as CreateMenuProps)
    })

    beforeEach(async ()=>{

        createOrderProps = {table_id: tableProps.id!, menu: menuProps.name, portion: faker.number.int({max: 10})}
        updateOrderProps = {
            id: createID,
            menu: menuProps.name,
            status: false, 
        }
        getOrderProps = {id: createID}
        deleteOrderProps  = {id: createID}
    })

    afterAll(async ()=>{
        await deleteTable({id: tableProps.id!})
        await deleteMenu({id: menuProps.id!})
    })

    describe('POST Order', () => {
        test('Successful POST Order', async () => {
            const {data, error}  = await awesome.async(()=>createOrder(createOrderProps))

            createID = data!.id

            expect(data!).toBeDefined()
            expect(data!.menu).toBe(createOrderProps.menu)
            expect(data!.table_id).toBe(createOrderProps.table_id)
            expect(data!.portion).toBe(createOrderProps.portion)
        })
    })

    describe('PATCH Order', () => {
        test('Successful Update Order', async () => {
            const {data, error}  = await awesome.async(()=>updateOrder(updateOrderProps))

            expect(data).toBeDefined()
            expect(data?.menu).toBe(updateOrderProps.menu)
            expect(data?.id).toBe(updateOrderProps.id)
            expect(data?.status).toBe(updateOrderProps.status)

        })
    })

    describe('GET Order', () => {
        test('Successful GET All Order', async () => {
            const {data, error}  = await awesome.async(()=>getOrders({}))

            expect(data).toBeDefined()
        })
        test('Successful GET Specific Order', async () => {
            const {data, error}  = await awesome.async(()=>getOrders(getOrderProps))

            expect(data).toBeDefined()
            expect(data![0].id).toBe(getOrderProps.id)
            expect(data![0].table_id).toBe(tableProps.id)

        })
    })

    describe('DELETE Order', () => {
        test('Successful DELETE Order', async () => {
            const {data, error}  = await awesome.async(()=>deleteOrder(deleteOrderProps))

            expect(data).toBeDefined()
            expect(data).toBe("successfully delete order")
        })
    })

});