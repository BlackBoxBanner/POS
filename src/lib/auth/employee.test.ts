import { describe, expect, test, beforeEach, beforeAll } from "vitest";
import {faker} from '@faker-js/faker';
import { awesome } from "@dookdiks/utils";
import { signUp } from "./signUp";
import { updateUser } from "./updateUser";
import { getUser } from "./getUser";

let createEmail: string
let createID: string


let signUpProps: { email: string; name: string; password: string; repetePassword: string; debug: boolean | undefined; force: boolean | undefined; }

type UpdateUserProps = { email: string; name: string; debug: boolean}
let updateUserProps: UpdateUserProps

type GetUserProps = {id: string; email: string}
let getUserProps: GetUserProps


describe('Employees Unit Test', () => {

        beforeEach(()=>{
        signUpProps = { 
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password : "admin",
            repetePassword: "admin",
            debug: false,
            force: true 
        }
        updateUserProps = {
            email: createEmail,
            name: faker.person.fullName(),
            debug: false
        }
        getUserProps = {
            id: createID,
            email: createEmail
        }
    })

    describe('POST Autentication', () => {
        test('Successful POST SignUp', async () => {
            const {data, error}  = await awesome.async(()=>signUp(signUpProps))

            createEmail = data.email
            createID = data.id

            expect(data).toBeDefined()
            expect(data?.email).toBe(signUpProps.email)
            expect(data?.name).toBe(signUpProps.name)
        })
    })

    /** 
     * Sign In Require 
    describe('PATCH User', () => {
        test('Successful Update User', async () => {
            const {data, error}  = await awesome.async(()=>updateUser(updateUserProps))

            expect(data).toBeDefined()
            expect(data?.email).toBe(createEmail)
            expect(data?.name).toBe(updateUserProps.name)
            
         })
    })
    */     
     
    describe('GET User', () => {
        test('Successful GET All User', async () => {
            const {data, error}  = await awesome.async(()=>getUser({}))
           
            expect(data).toBeDefined()
        })
        test('Successful GET Specific User with Email', async () => {
            const {data, error}  = await awesome.async(()=>getUser({email: createEmail}))
            
            expect(data).toBeDefined()
            expect(data![0].email).toBe(createEmail)
        })
        test('Successful GET Specific User with ID', async () => {
            const {data, error}  = await awesome.async(()=>getUser({id: createID}))
            
            expect(data).toBeDefined()
            expect(data![0].id).toBe(createID)
        })
        test('Successful GET Specific User with Email & ID', async () => {
            const {data, error}  = await awesome.async(()=>getUser(getUserProps))
            
            expect(data).toBeDefined()
            expect(data![0].id).toBe(createID)
            expect(data![0].email).toBe(createEmail)
        })
    })

});