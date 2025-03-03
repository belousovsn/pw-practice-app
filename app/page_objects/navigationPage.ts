import {Locator, Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase {

    readonly formLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItm: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage (){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSecond(2)
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        //await this.page.getByText('Forms').click()
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage () {
        await this.selectGroupMenuItem('Tables & Data')
        //await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage () {
        await this.selectGroupMenuItem('Modal & Overlays')
        //await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage () {
        await this.selectGroupMenuItem('Modal & Overlays')
        //await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }
}