import { describe, expect, test, beforeEach, beforeAll } from "vitest";
import {faker} from '@faker-js/faker';
import { createDishType, updateDishType, type CreateTypeProps, type DeleteTypeProps, type GetTypeProps, type UpdateTypeProps, getDishType, deleteDishType } from ".";
import { awesome } from "@dookdiks/utils";

let createID: string

let createTypeProps: CreateTypeProps
let updateTypeProps: UpdateTypeProps
let getTypeProps: GetTypeProps
let deleteTypeProps: DeleteTypeProps
let currentTypeProps: UpdateTypeProps

describe('Dish Type API', () => {

    beforeEach(()=>{
        createTypeProps = {name: faker.person.firstName('male')}
        updateTypeProps = {
            id: createID,
            name: faker.person.firstName('male'), 
        }
        getTypeProps = {id: createID}
        deleteTypeProps  = {id: createID}
    })

    describe('POST DishType', () => {
        test('Successful POST DishType', async () => {
            const {data, error}  = await awesome.async(()=>createDishType(createTypeProps))

            createID = data!.id

            expect(data).toBeDefined()
            expect(data?.name).toBe(createTypeProps.name)
        })
    })

    describe('PATCH DishType', () => {
        test('Successful Update DishType', async () => {
            const {data, error}  = await awesome.async(()=>updateDishType(updateTypeProps))
            
            currentTypeProps = data!

            expect(data).toBeDefined()
            expect(data?.id).toBe(updateTypeProps.id)
            expect(data?.name).toBe(updateTypeProps.name)

        })
    })
    
    describe('GET DishType', () => {
        test('Successful GET All DishType', async () => {
            const {data, error}  = await awesome.async(()=>getDishType({}))

            expect(data).toBeDefined()
        })
        test('Successful GET Specific DishType', async () => {
            const {data, error}  = await awesome.async(()=>getDishType(getTypeProps))
            
            expect(data).toBeDefined()
            expect(data![0].id).toBe(currentTypeProps.id)
            expect(data![0].name).toBe(currentTypeProps.name)

        })
    })

    describe('DELETE DishType', () => {
        test('Successful DELETE  DishType', async () => {
            const {data, error}  = await awesome.async(()=>deleteDishType(deleteTypeProps))

            expect(data).toBeDefined()
            expect(data).toBe("successfully delete dish type")
        })
    })

});