##代码运行
//安装依赖
npm install

//测试代码
npm run test

//生产环境
npm run build

## Basic Usage
let Ecoball = require('ecoballjs')


// 节点地址：'http://192.168.8.62:20679'
let ecoball = new Ecoball({'http://192.168.8.62:20679'})

//生成私钥 输出公私钥对
let keyObj = ecoball.getPrivateKey()

//导入私钥 输出公私钥对
let privitkey = "95187b89cb1d07e47badb30149522c515dbbcef112ddcc350622fbbbe7520110"
let keyObj = ecoball.importPrivateKey(privitkey)

//生成钱包地址
let privitkey = "95187b89cb1d07e47badb30149522c515dbbcef112ddcc350622fbbbe7520110"
let walletAdgress = ecoball.getWalletAdress(privitkey)

//私钥交易
1.
 /**
   *  用途：签名信息
   *  返回二进制
   *  @msg 交易信息（二进制）
   *  @privitkey {钱包私钥}
   */
let signatureInfo = ecoball.signature(msg,privitkey)

2.
 /**
   *  用途：推送交易
   *  返回二进制
   *  @method 'post'
   *  @url     '/transcation'
   *  @signatureInfo {签名信息}
   */
 ecoball.transcation(method,url,signatureInfo)