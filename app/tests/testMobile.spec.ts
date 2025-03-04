import {test, expect} from '@playwright/test'

test.describe('Mobile tests', () => {
    test('input fields', async ({page}, testInfo) => {
        
        await page.goto('/', {waitUntil: 'domcontentloaded'})


        if(testInfo.project.name.includes('Mobile')){
            await page.locator('.sidebar-toggle').click()
        }
        await page.getByText('forms').click()
        await page.getByText('Form Layouts').click()
        if(testInfo.project.name.includes('Mobile')){
            await page.locator('.sidebar-toggle').click()
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the grid"}).getByRole('textbox', {name: 'Email'})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test222@test.com', {delay: 200})

        // const inputValue = await usingTheGridEmailInput.inputValue()
        // expect(inputValue).toEqual('test222@test.com')
})

    test('Check side panel items availability after scrolling', async ({page}, testInfo) => {
        const sidebar = page.locator('.scrollable')

        await page.goto('/', {waitUntil: 'domcontentloaded'})
        if(testInfo.project.name.includes('Mobile')){
            await page.locator('.sidebar-toggle').click()
        }
        await page.getByText('forms').click()
        await page.getByText('Modal & Overlays').click()
        await page.waitForTimeout(2000)
        await page.screenshot({path: 'screenshots/sidePanelInitial.png'})
        //screenshot is flaky here
        
        const authMenuItem = page.getByText('Auth')
        const boundingBox = await authMenuItem.boundingBox()

        if(boundingBox) {
            const viewportHeight = page.viewportSize().height
            expect(boundingBox.y).toBeGreaterThan(viewportHeight)
        }
        await sidebar.evaluate((el) => {
            el.scrollBy(0, 500); // Прокручиваем на 500 пикселей вниз
        });

        await authMenuItem.waitFor({state: 'visible'})
        expect(await authMenuItem.isVisible()).toBeTruthy()
        await page.screenshot({path: 'screenshots/sidePanelafterScroll.png'})
    })
})

