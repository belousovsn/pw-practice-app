import {test, expect} from '@playwright/test'
import { PageManager } from '../page_objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})
test.describe('Forms Page actions', () => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
    const randomFirstName = faker.person.firstName()
    const randomLastName = faker.person.lastName()

    test('Fill in Basic form', async({page}) => {
        const pm = new PageManager(page)
        await pm.navigateTo().formLayoutsPage()
        await pm.onFormLayoutsPage().submitBasicFormWithEmailPasswordAndCheckbox(process.env.EMAIL, process.env.PASSWORD, true)
        await page.locator('nb-card', {hasText: "Basic form"}).screenshot({path: 'screenshots/basicFormAfterFill.png'})
    })

    test('Fill in Block form', async({page}) => {
        const pm = new PageManager(page)
        await pm.navigateTo().formLayoutsPage()
        await pm.onFormLayoutsPage().submitBlockFormWithFirstLastNameEmailWebsite(randomFirstName, randomLastName, randomEmail, 'https://www.test.com')
        await page.locator('nb-card', {hasText: "Block form"}).screenshot({path: 'screenshots/blockFormAfterFill.png'})
    })
})