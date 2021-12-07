# device-splider

根据已有的手机型号到 gsmarena 站点匹配设备详情信息, 根据 excel 中已经罗列好的查询地址（或者机型ID），逐个访问 [www.gsmarena.com](https://www.gsmarena.com) 获取详细数据。

如果一个机型匹配多个结果，则标注 **[多个匹配]**
如果一个机型匹配不到结果，则标注 **[无匹配]**
这两个情况需要人工核查

## 安装
```
cd device-splider
npm install
```

## 使用
1. 确保excel存在合规的 input.xlsx 文件
```
# 开始爬
npm start
```

2. 中断 / 分割任务
可以在 `app.js` 中设置起始和结束任务位置，根据序号判定
```
# app.js

// 设置爬虫起始和结束行数，避免重复抓取
const startIndex = 494
// endIndex 0 为不限制
const endIndex = 0
```