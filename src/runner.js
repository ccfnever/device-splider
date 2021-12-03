
const cheerio = require('cheerio');
const Browser = require('./Browser.js')

const { sleep, newCustomPage } = require('./util')


async function run(firstLink) {
  const browser = await new Browser().launch()

  /**
   * 获取机型详情的地址
   * @param {*} link 
   * @returns number | string 如果返回 0 或者 1，表示异常，0：无匹配， 1: 多个匹配
   */
  const getDetailPage = async (link) => {
    const page = await newCustomPage(browser)
    console.log(`开始访问检索页 ${link}`)

    await page.goto(link);
    // await sleep(2000)

    await page.waitForSelector('#review-body');
    const specs = await page.$$('#review-body .makers a')

    if (specs.length > 1) return 1
    if (specs.length === 0) return 0

    let href = ''
    if (specs.length === 1) {
      console.log('机型： 匹配成功')
      href = await page.evaluate(el => el.getAttribute('href'), specs[0])
    }
    await page.close()
    return href
  }

  // 详情信息
  const getDeviceInfo = async (link) => {
    const page = await newCustomPage(browser)
    console.log(`开始访问详情页 ${link}`)

    await page.goto(link);
    // await sleep(2000)

    await page.waitForSelector('#specs-list');
    const detailHtml = await page.$eval('html', el => el.innerHTML);
    const $ = cheerio.load(detailHtml)
    const infoTable = $('#specs-list table')

    const infoList = []

    for (let i = 1; i < infoTable.length; i++) {
      // if (i > 2) continue
      const blockInfoList = infoTable.eq(i).find('tr')
      for (let j = 0; j < blockInfoList.length; j++) {
        const title = blockInfoList.eq(j).find('.ttl').text()
        const info = blockInfoList.eq(j).find('.nfo').text()
        infoList.push(`[${title}]----${info}`)
      }
    }

    await page.close()
    return infoList
  }

  const deviceInfoHref = await getDetailPage(firstLink)
  // 无匹配或多个匹配，则无需查询详情页，返回人工处理
  if (deviceInfoHref === 0 || deviceInfoHref === 1) return { pending: deviceInfoHref }

  const detailLink = `https://www.gsmarena.com/${deviceInfoHref}`
  const deviceInfoList = await getDeviceInfo(detailLink)

  await browser.close()

  return {
    pending: 2,
    detailLink,
    deviceInfoList
  }
}

module.exports = run