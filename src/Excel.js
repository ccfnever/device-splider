const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path')

class Excel {
  constructor(inputPath) {
    this.inputPath = inputPath
    this.workSheetsFromFile = null
  }

  init() {
    if (this.inputPath) {
      this.workSheetsFromFile = xlsx.parse(this.inputPath);
    }
  }

  getExcelData() {
    return this.workSheetsFromFile
  }

  setExcelData(data) {
    this.workSheetsFromFile = data
  }

  exportExcel() {
    const buffer = xlsx.build(this.workSheetsFromFile)
    fs.writeFile('./out/result,xls', buffer, err => {
      if (err) throw err;
      console.log('写入完毕');
    })
  }
}

module.exports = Excel