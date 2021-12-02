const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const Browser = require('./Browser.js')

const { sleep, newCustomPage } = require('./util')


async function run(firstLink) {
  const browser = await new Browser().launch()

  // 获取机型详情的地址
  const getDetailPage = async (link) => {
    const page = await newCustomPage(browser)
    console.log(`开始访问 ${link}`)

    await page.goto(link);
    await sleep(2000)

    await page.waitForSelector('#review-body');
    const specs = await page.$$('#review-body .makers a')

    let href = ''
    if (specs.length === 1) {
      console.log('机型： 匹配成功')
      href = await page.evaluate(el => el.getAttribute('href'), specs[0])
    }
    return href
  }

  // 详情信息
  const getDeviceInfo = async (link) => {
    const page = await newCustomPage(browser)
    console.log(`访问详情 ${link}`)

    await page.goto(link);
    await sleep(2000)

    await page.waitForSelector('#specs-list');
    const detailHtml = await page.$eval('html', el => el.innerHTML);
    const $ = cheerio.load(detailHtml)
    const infoTable = $('#specs-list table')
    console.log('infoTable', infoTable.length)

  }

  const deviceInfoHref = await getDetailPage(firstLink)

  await getDeviceInfo(`https://www.gsmarena.com/${deviceInfoHref}`)


}

module.exports = run