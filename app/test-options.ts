import {test as base} from '@playwright/test'
import { PageManager } from './page_objects/pageManager'
export type TestOptions = {
    globalsQaUrl: string,
    googleURL: string,
    formLayoutsPage: string,
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaUrl: ['', {option: true}],
    googleURL: ['', {option: true}],

    formLayoutsPage: [async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        //everything that is after use will be done after test execution
    }, {auto: true}],
    //can use mode auto and exclude adding this fixture as an argument for tests, it will still run
    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})