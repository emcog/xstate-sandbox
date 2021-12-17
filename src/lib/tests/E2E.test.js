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
	it("should have onboarding instructions which update during press-hold", async () => {
		await page.setViewport({ width: 729, height: 826 })
		await page.goto(baseUrl);
		await page.waitForSelector('#press-hold-button');

		await page.mouse.move(372, 110)

		// insert or assertion test here e.g.
		// expect(allTodoItemsText).contain("Run Test");
		/* size of ballon changes or text updates on the test */

		}, 100000)});
