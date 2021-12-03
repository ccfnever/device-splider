const run = require('./runner')
const Excel = require('./Excel')
const path = require('path')

const xlsFile = path.resolve(__dirname, '../excel/input2.xlsx')
const outXlsFile = path.resolve(__dirname, '../out/result.xlsx')
const xls = new Excel(xlsFile)
const xlsData = xls.getExcelData()

const realData = xlsData[0].data.filter(c => c.length)

const runAll = async () => {
  const startIndex = 9

  for (let i = 1; i < realData.length; i++) {
    // if (i > 1) continue
    const singleResult = await run(realData[i][5])
    const { pending, detailLink, deviceInfoList } = singleResult

    if (pending !== 2) {
      realData[i][8] = pending === 0 ? '无匹配' : '多个匹配'
    } else {
      realData[i][8] = '匹配完成'
      realData[i][6] = detailLink

      // 从第 9 列开始插入爬虫数据
      deviceInfoList.forEach(((item, subIndex) => {
        realData[i][subIndex + startIndex] = item
      }))
    }

    // 写入数据
    console.log(`============ 正在写入序号：${realData[i][0]}===================`)
    xlsData[0].data = realData
    xls.setExcelData(xlsData)
    xls.exportExcel(outXlsFile)
  }

}

runAll()

