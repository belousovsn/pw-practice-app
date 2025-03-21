import {Locator, Page} from '@playwright/test'
import { InputFilterComponent } from 'ng2-smart-table/lib/components/filter/filter-types/input-filter.component'
import { HelperBase } from './helperBase'

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption (email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the grid"})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
/**
 * This method fills up inline name and email 
 * @param name - should be first and last name
 * @param email 
 * @param rememberMe 
 */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const usingInlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await usingInlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await usingInlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        const checked = await usingInlineForm.getByRole('checkbox').isChecked()
        if(rememberMe)
            if(!checked) {
                await usingInlineForm.getByRole('checkbox').check({force: true})
            }
        await usingInlineForm.getByRole('button').click()
    }

    async submitBasicFormWithEmailPasswordAndCheckbox(email: string, password: string, checkMeOut: boolean) {
        const basicForm = this.page.locator('nb-card', {hasText: "Basic form"})
        await basicForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await basicForm.getByRole('textbox', {name: 'Password'}).fill(password)
        const checked = await basicForm.getByRole('checkbox').isChecked()
        if(checkMeOut)
            if(!checked) {
                await basicForm.getByRole('checkbox').check({force: true})
            }
        await basicForm.getByRole('button').click()
    }

    async submitBlockFormWithFirstLastNameEmailWebsite(firstName: string, lastName:string, email: string, webSite: string) {
        const blockForm = this.page.locator('nb-card', {hasText: "Block form"})
        await blockForm.getByRole('textbox', {name: 'First Name'}).fill(firstName)
        await blockForm.getByRole('textbox', {name: 'Last Name'}).fill(lastName)
        await blockForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await blockForm.getByRole('textbox', {name: 'Website'}).fill(webSite)
        await blockForm.getByRole('button').click()
    }
}