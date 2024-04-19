import { test, expect } from '@playwright/test';
const UI_URL='http://localhost:5173/' 

const testEmail=`test_register_${Math.floor(Math.random()*9000)+1000}@test.com`

test('should allow users to register',async({page})=>{
  await page.goto(UI_URL);
  await page.getByRole('link',{name:"Sign in"}).click();
  await page.getByRole('link',{name:"Create an account here"}).click();
  await expect(page.getByRole('heading',{name:"Create an Account"})).toBeVisible()
  await page.locator('[name=firstName]').fill("test_firstname")
  await page.locator('[name=lastName]').fill("test_lastname")
  await page.locator('[name=email]').fill(testEmail)
  await page.locator('[name=password]').fill("pass123")
  await page.locator('[name=confirmPassword]').fill("pass123")
  await page.getByRole('button',{name:"Create Account"}).click();
  await expect(page.getByText('Registration Success')).toBeVisible();
  await expect(page.getByRole('link',{name:'My bookings'})).toBeVisible()
  await expect(page.getByRole('link',{name:'My hotels'})).toBeVisible()
  await expect(page.getByRole('button',{name:"Sign Out"})).toBeVisible();
}) 
test('should allow user to sign in',async({page})=>{
  await page.goto(UI_URL);
  await page.getByRole('link',{name:'Sign in'}).click();
  await expect(page.getByRole('heading',{name:'Sign In'})).toBeVisible();
  await page.locator('[name=email]').fill(testEmail)
  await page.locator('[name=password]').fill('pass123')
  await page.getByRole('button',{name:'Login'}).click();
  await expect(page.getByText('Logged in successfully')).toBeVisible();
  await expect(page.getByRole('link',{name:'My bookings'})).toBeVisible();
  await expect(page.getByRole('link',{name:'My hotels'})).toBeVisible();
  await expect(page.getByRole('button',{name: 'Sign Out'})).toBeVisible();
})
