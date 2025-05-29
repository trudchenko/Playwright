
import { test, expect, request as globalRequest } from '@playwright/test';
import { LoginPage } from '../Support/poms';
import { Garage } from '../Support/poms';

/** @type {LoginPage} */
let loginpage;
let garage;

test.describe('Login test', () => {
    test.beforeEach(async({ page, baseURL}) => {
        loginpage = new LoginPage(page);
        garage = new Garage(page);
        
        await page.goto(baseURL);
        await loginpage.executeLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
        await page.waitForTimeout(1000); //without timeout session cookies are not stored
    });

    test.afterEach ('Remove Card', async () => {
        await garage.removeCar();
    });

    test('API: change profile name fulfill only', async ( {page} ) => {
    //  const profilePostRequest = page.waitForRequest(`**/api/users/profile`, { timeout: 10000 });
    //  const profilePostResponse = page.waitForResponse(`**/api/users/profile`, { timeout: 10000 });

        await page.route(`**/api/users/profile`, async route => {
            const json = {
                'status': 'ok',
                'data': {
                    'userId': 213494,
                    'photoFilename': 'user-1745055770945.png',
                    'name': 'Tetiana',
                    'lastName': 'Kumina'  
                }
            };
            await route.fulfill({json });
            await page.getByRole('button', { name: 'User photo My profile' }).click();
            await page.getByRole('link', { name: 'Profile', exact: true }).click();
            await expect(loginpage.selectors.buttonEditProfile).toBeVisible();
            await expect(page.getByText('Tetiana Kumina')).toBeVisible();
            // const req = await profilePostRequest;
            // const res = await profilePostResponse;
            // console.log(req.headers());
            // console.res(req.headers());
        });
    });

    test('API: change profile name fulfill with fetch', async ( {page} ) => {
            
        await page.route(`**/api/users/profile`, async route => {

            const response = await route.fetch();
            const json = await response.json();

            json.data.name = 'Tanya'
            json.data.lastName = 'Kumina'
            await route.fulfill({response, json });
        });
        
        await page.getByRole('button', { name: 'User photo My profile' }).click();
        await page.getByRole('link', { name: 'Profile', exact: true }).click();
        await expect(loginpage.selectors.buttonEditProfile).toBeVisible();
        await expect(page.getByText('Tanya Kumina')).toBeVisible();
    });

    test('API: create car Global Context', async ({page}) => {

        const allCookies = (await page.context().cookies()).reduce((acc, curr) => {
            return `${acc} ${curr.name}=${curr.value};`;
        }, '');

        const globalContext = await globalRequest.newContext();

        await globalContext.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 123
            },
            headers: {
                cookie: allCookies
            }
        });

        await page.reload();
        await expect(garage.selectors.carExist).toBeVisible();
    });

    test('API: create car Local Context', async ({page, request: localContext}) => {

        const allCookies = (await page.context().cookies()).reduce((acc, curr) => {
            return `${acc} ${curr.name}=${curr.value};`;
        }, '');

        await localContext.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 123
            },
            headers: {
                cookie: allCookies
            }
        });

        await page.reload();
        await expect(garage.selectors.carExist).toBeVisible();
    });

    test('API: create car Page/Browser Context', async ({page}) => {

        const pageContext = page.request;

        //await page.request.post('/api/cars', {
        await pageContext.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 123
            }
        });

        await page.reload();
        await expect(garage.selectors.carExist).toBeVisible();
    });

    test('API: create car no mileage', async ({page}) => {

        const addCar = await page.request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1
            }
        });

        const addCarResponce = await addCar.json();
        expect(addCarResponce.message).toEqual('Mileage is required');
        await page.reload();
        await expect(garage.selectors.carExist).toHaveCount(0);
    });

    test('API: create car incorrect carBrandId', async ({page}) => {

        const addCar = await page.request.post('/api/cars', {
            data: {
                carBrandId: 104,
                carModelId: 1,
                mileage: 123
            }
        });

        const addCarResponce = await addCar.json();
        expect(addCarResponce.message).toEqual('Brand not found');
        await page.reload();
        await expect(garage.selectors.carExist).toHaveCount(0);
    });
})


