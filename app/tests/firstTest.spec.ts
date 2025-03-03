import { BaseCdkCell } from '@angular/cdk/table'
import { expect, test } from '@playwright/test'
import { asapScheduler } from 'rxjs'
//import { changePageScale } from './test_helpers/pageScaler'

test.beforeEach('open Form Layouts', async ({page}) => {
    await page.goto('/')
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await page.getByText('forms').click()
    await page.getByText('Form Layouts').click()
})

test.only('Locator syntax rules', async ({page}) => {
    //by Tag name
    page.locator('imput')
    //by id ()
    page.locator('#inputEmail1')
    //by class
    page.locator('.shape-rectangle')
    //by attribute
    page.locator('[placeholder="Email"]')
    //by entire class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    //combine different selectors
    page.locator('input[placeholder="Email"]')
    //by XPATH (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')
    //by partial text match
    page.locator(':text("Using")')
    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test("User-facing locators", async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()
    await page.getByLabel('Email').first().dblclick()
})

//location parent element


test("Locating parent element", async ({page}) => {
    await page.evaluate(() => {
        document.body.style.transform = 'scale(1.4)'
      })
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).fill("EmailAddress")
    await page.locator('nb-card', {has: page.locator(':text-is("Using the Grid")')}).getByRole('textbox', {name: 'Password'}).fill("PasswordText")
})

test("Reusing the locators", async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic Form'})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passField = basicForm.getByRole('textbox', {name: "Password"})
    await emailField.fill('email@email.com')
    await passField.fill('pass123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('email@email.com')
    await expect(passField).toHaveValue('pass123')
    expect(basicForm.locator('nb-checkbox')).toBeChecked
})

test("extracting values", async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic Form'})
    const buttonText = await basicForm.getByRole('button').textContent()
    expect(buttonText).toEqual('Submit')
})
test("checking click", async ({page}) => {
    //all text values
    const gridForm = page.locator('nb-card').filter({hasText: "Using the Grid"})
    
    const allRadioButtonValues = await gridForm.locator('nb-radio').allTextContents()
    expect(allRadioButtonValues).toContain('Option 1') 

    await gridForm.filter({hasText: 'Option 1'}).click()

    let atLeastOneIsChecked :boolean = false

    allRadioButtonValues.forEach(element => {
        if(gridForm.filter({hasText: `${element}`}).isChecked) atLeastOneIsChecked = true
    })   

    expect(atLeastOneIsChecked).toBe(true)
})

test("input value", async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic Form'})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@email.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@email.com')

    await emailField.clear()
    expect(await emailField.getAttribute('placeholder')).toEqual('Email')
})





