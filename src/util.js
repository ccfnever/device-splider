const sleep = async (time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const newCustomPage = async (browser) => {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0)
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (
      interceptedRequest.resourceType() === 'script' ||
      interceptedRequest.resourceType() === 'font' ||
      interceptedRequest.resourceType() === 'image'
    ) {
      interceptedRequest.abort();
    } else {
      interceptedRequest.continue();
    }
  });
  return page
}

module.exports = {
  sleep,
  newCustomPage
}