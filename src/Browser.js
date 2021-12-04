
const puppeteer = require('puppeteer');

class Browser {

  constructor(option) {
    const defaultOption = {
      headless: false,
      defaultViewport: null,
      ignoreDefaultArgs: ['--disable-extensions'],
      args: ['--start-maximized', `--window-size=200,300`,'--no-sandbox',
        '--disable-dev-shm-usage', '--disable-setuid-sandbox', // <-- add this one
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',
      ],
      ignoreDefaultArgs: ['--enable-automation'],
    }

    this.option = option || defaultOption
  }

  async launch() {
    return await puppeteer.launch(this.option)
  }

}

module.exports = Browser