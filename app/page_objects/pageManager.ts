import {Locator, Page, test} from '@playwright/test'
import {NavigationPage} from '../page_objects/navigationPage'
import {FormLayoutsPage} from '../page_objects/formLayoutsPage'
import { DatePickerPage } from '../page_objects/datePickerPage'

export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage
    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    navigateTo() {
        return this.navigationPage
    }
    onFormLayoutsPage() {
        return this.formLayoutsPage
    }
    onDatePickerPage() {
        return this.datePickerPage
    }
}