import {test, expect} from '@playwright/test'
import { PageManager } from '../page_objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})
test.describe('Forms Page actions', () => {
    
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
})