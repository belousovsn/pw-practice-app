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

    test.skip('navigate to form page', async({page}) => {
        const pm = new PageManager(page)
        await pm.navigateTo().formLayoutsPage()
        await pm.navigateTo().datePickerPage()
        await pm.navigateTo().smartTablePage()
        await pm.navigateTo().toastrPage()
        await pm.navigateTo().tooltipPage()
    })

    test.skip('parametrized methods', async({page}) => {
        const pm = new PageManager(page)
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        await pm.navigateTo().formLayoutsPage()
        await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
        await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
        const buffer = await page.screenshot()
        await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
        await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineFormAfterFill.png'})

        await pm.navigateTo().datePickerPage()
        await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(44)
        await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(3,5)

    })

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