import { expect, test } from '@playwright/test'
import { exec } from 'child_process'

test.beforeEach('open Form Layouts', async ({page}) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test.skip('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 30000})
})

test.skip('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')
    //wait for element
    //await page.waitForSelector('.bg-success')
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

    //wait for particular response ^

    //wait for network calls
    //await page.waitForLoadState('networkidle')
    
})
