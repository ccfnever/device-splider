const run = require('./runner')
const Excel = require('./Excel')
const path = require('path')

const xlsFile = path.resolve(__dirname, '../excel/input.xlsx')
const outXlsFile = path.resolve(__dirname, '../out/result.xlsx')
const xls = new Excel(xlsFile)
const xlsData = xls.getExcelData()

const realData = xlsData[0].data.filter(c => c.length)

// 设置爬虫起始和结束行数，避免重复抓取
const startIndex = 494
// endIndex 0 为不限制
const endIndex = 0

const runAll = async () => {
  const startIndex = 9

  for (let i = 1; i < realData.length; i++) {
    // 在这里跳过
    if (i < startIndex) continue
    if (endIndex !== 0 && i > endIndex) continue
    
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
    console.log(`============ 正在写入序号：${realData[i][0]} ===================`)
    xlsData[0].data = realData
    xls.setExcelData(xlsData)
    xls.exportExcel(outXlsFile)
  }

}

runAll()

