import {test, expect, selectors} from '@playwright/test'

//test.describe.configure({mode: 'parallel'})
//if tests are dependant, use 'serial'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe.parallel('Form layouts page', async () => {

    //local test retries setting
    test.describe.configure({retries: 0})
    
    test.beforeEach('open Form Layouts', async ({page}) => {
        await page.getByText('forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}, testInfo) => {

        if(testInfo.retry) {
            //make stuff to prepare the test for a clean run
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the grid"}).getByRole('textbox', {name: 'Email'})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test222@test.com', {delay: 200})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test222@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test222@test.com')
    })

    test.only('radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the grid"})
        //await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})

        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
        await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 15})


        // expect(radioStatus).toBeTruthy()
        // await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        // await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        // await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).not.toBeChecked()
    })
})

test('tooltip', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    const tooltipHeader = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    const tooltipButton = tooltipHeader.getByRole('button', {name: 'Top'})
    await tooltipButton.hover()

    //page.getByRole('tooltip') //only if role is created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //const usingToasterPage = page.locator('div[class = "col-md-6 col-sm-12"]', {has: page.getByLabel('Toast type:')})
    //await usingToasterPage.getByRole('checkbox', {name: 'Hide on click'}).click()
    //await expect(usingToasterPage.getByRole('checkbox', {name: 'Hide on click'})).toBeChecked()

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
    //check doesn't click if its checked
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    const allBoxes = await page.getByRole('checkbox')
    for(const box of await allBoxes.all()) {
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }

})

test('listitems', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    //const listItemArray = page.getByRole('list').locator('nb-option')
    const listItemArray = page.locator('nb-option-list nb-option')
    await dropDownMenu.click()
    await expect(listItemArray).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await listItemArray.filter({hasText: 'Dark'}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }
    await dropDownMenu.click()
    for (const color in colors) {
        await listItemArray.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != 'Corporate')
            await dropDownMenu.click()
    }
})

  //  test.describe('Modal & Overlays page', async ()

test('dialog box', async ({page}) => {
    await page.getByText('Tables & Data').click()
    
    await page.getByText('Smart Table').click()

    //dealing with browser pop-up
    //this is a listener
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    
    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdogmail.com')
})

test('web tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1 get the row by any text in this row
    const targetRow = page.getByRole('row', {name:"jack@yandex.ru"})
    //name here is a text value that is unique for this particular row
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    await expect(targetRow.locator('td').last()).toHaveText('35')

    //2 get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    //returns all roles with 11 in it, then filters the 'td' elements out of it, then takes only first 'td's, then takes 
    // one with 11 in it
    const targetRowByID = page.getByRole('row', {name:"11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@kinzul.com')
    await page.locator('.nb-checkmark').click()

    await expect(targetRowByID.locator('td').nth(5)).toHaveText('test@kinzul.com')

    //3 test filter from the data

    const ages = ["20", "28", "40", "200"]

    for ( let age of ages ) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age == '200') {
                //expect(await page.locator('tbody').textContent()).toEqual(" No data found ")
                expect(await page.getByRole('table').textContent()).toContain("No data found")
            }
            else {
                expect(cellValue).toEqual(age)
            }
            
        }
    }
})


test('datepicker', async({page}) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const date = new Date()
    //date.setDate(date.getDate() + 1)
    //const currentMonth = months[date.getMonth()]
    const currentMonth = date.toLocaleString('En-US', {month: 'short'})
    const curentYear = date.getFullYear()
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder("Form Picker")
    await calendarInputField.click()

    await page.locator('[class = "day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInputField).toHaveValue(`${currentMonth} 1, ${curentYear}`)
})


test('sliders short', async ({page}) => {
    // update slider attribute
    //short one with updating the attr
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()

    

    
})

test('sliders mouse', async ({page}) => {
    //mouse movement 
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')

    //!! useful command
    await tempBox.scrollIntoViewIfNeeded()
    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2 
    const y = box.y + box.height / 2

    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x+100,y)
    await page.mouse.move(x+100,y+100)
    await page.mouse.up()
    
    await expect(tempBox).toContainText('30')
})