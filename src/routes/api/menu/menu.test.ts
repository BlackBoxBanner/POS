import { getMenu, type CreateMenuProps, 
    createMenu, updateMenu, type UpdateMenuProps, 
    type GetMenuProps, type DeleteMenuProps, deleteMenu } from "../../../lib/handler/menu";
import { describe, expect, test, beforeEach, beforeAll } from "vitest";
import {faker} from '@faker-js/faker';
import { awesome } from "@dookdiks/utils";

let createID: string

let createMenuProps: CreateMenuProps
let updateMenuProps: UpdateMenuProps
let getMenuProps: GetMenuProps
let deleteMenuProps: DeleteMenuProps
let currentMenuProps: UpdateMenuProps



describe('Menu API', () => {

    beforeEach(()=>{
        createMenuProps = {name: faker.person.firstName('male'), price: faker.number.int()}
        updateMenuProps = {id: createID, 
            name: faker.person.firstName('male'), 
            price: faker.number.int(), 
            image: faker.internet.url(),     
            status: false
        }
        getMenuProps = {id: createID}
        deleteMenuProps  = {id: createID}
    })

    describe('POST Menu', () => {
        test('Successful POST Menu', async () => {
            const {data, error}  = await awesome.async(()=>createMenu(createMenuProps))

            createID = data!.id

            expect(data).toBeDefined()
            expect(data?.name).toBe(createMenuProps.name)
            expect(data?.price).toBe(createMenuProps.price)
        })
    })

    describe('PATCH Menu', () => {
        test('Successful Update Menu', async () => {
            const {data, error}  = await awesome.async(()=>updateMenu(updateMenuProps))
            
            currentMenuProps = data!

            expect(data).toBeDefined()
            expect(data?.id).toBe(updateMenuProps.id)
            expect(data?.name).toBe(updateMenuProps.name)
            expect(data?.price).toBe(updateMenuProps.price)
            expect(data?.image).toBe(updateMenuProps.image)
            expect(data?.status).toBe(updateMenuProps.status)

        })
    })
    
    describe('GET Menu', () => {
        test('Successful GET All Menu', async () => {
            const {data, error}  = await awesome.async(()=>getMenu({}))

            expect(data).toBeDefined()
        })
        test('Successful GET Specific Menu', async () => {
            const {data, error}  = await awesome.async(()=>getMenu(getMenuProps))
            
            expect(data).toBeDefined()
            expect(data?.data[0].name).toBe(currentMenuProps.name)
            expect(data?.data[0].price).toBe(currentMenuProps.price)
            expect(data?.data[0].image).toBe(currentMenuProps.image)
            expect(data?.data[0].status).toBe(currentMenuProps.status)
        })
    })

    describe('DELETE Menu', () => {
        test('Successful DELETE  Menu', async () => {
            const {data, error}  = await awesome.async(()=>deleteMenu(deleteMenuProps))

            expect(data).toBeDefined()
            expect(data?.id).toBe(currentMenuProps.id)
            expect(data?.name).toBe(currentMenuProps.name)
            expect(data?.price).toBe(currentMenuProps.price)
            expect(data?.image).toBe(currentMenuProps.image)
            expect(data?.status).toBe(currentMenuProps.status)
        })
    })

});