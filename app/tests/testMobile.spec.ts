import {test, expect} from '@playwright/test'

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