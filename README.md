## 概要
Android版使用Hybird方式开发，前端部分为单页应用。
(本版本目标不止运行于Android，还需考虑在浏览器下单独运行的情况。)

## 前端框架及工具集
- 视图层框架：React
- 构建工具：Webpack
- 项目模板：react-boilerplate
- UI库: ant-design-mobile

## 命令
- 开发调试: npm start 本地开发调试
- 33测试打包: npm run prepub  用于部署到33进行测试
- 线上测试打包: npm run onlinetest  用真实的线上域名进行测试
- 正式打包: npm run publish 用于正式发布!

## 发布流程!
- 确认版本代码无误后,修改index.html中的版本号(window.__APP_CONFIG.ver),如果需要展示引导图,修该相关配置,同时不要忘了指定引导页所需版本号(window.__APP_CONFIG.guide.ver,将来以此判断是否要再次展示轮播图)
- 执行正式打包命令
- 执行 zip -9r h5-app_yourVersion.zip build -x 'DS_Store'
- 将zip文件传给后端运维部署上线
- 上线后同产品经理做好线上测试！

