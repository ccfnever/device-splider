const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path')

class Excel {
  constructor(inputPath) {
    this.inputPath = inputPath
    this.workSheetsFromFile = null
    this.init()
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

  exportExcel(outPath) {
    const buffer = xlsx.build(this.workSheetsFromFile)
    fs.writeFile(outPath, buffer, err => {
      if (err) throw err;
      console.log('文件保存成功');
    })
  }
}

module.exports = Excel