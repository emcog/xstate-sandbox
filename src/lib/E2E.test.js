const puppeteer = require('pupeteer');

const baseUrl = 'http://localhost:5000'

let browser
let page

beforeAll(async () => {
	browser = await puppeteer.launch(
		{
			headless: false,
			slowMo: 500
		}
	)
	page = await browser.newPage()
})

afterAll(() => {
	browser.close()
})

describe("Phab button", () => {
	it("should be accessable with keyboard", async () => {
		await page.setViewport({ width: 1920, height: 1080 })
		await page.goto(baseUrl);
		await page.waitForSelector('#press-hold-button');
		await page.focus('button[id=press-hold-button]')
		await page.keyboard.onkeydown('Space', delay: 200);
		await page.keyboard.onkeydown('Space', delay: 300);

		// insert or assertion test here e.g.
		// expect(allTodoItemsText).contain("Run Test");


		}, 100000)});
