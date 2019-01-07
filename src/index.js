const sign = require("./sign")
const api =  require("./tx")
class Ecoball extends sign {
    constructor(url){
        super(url)
        //钱包信息
        // this.wallet_info = wallet_info
        //私钥二进制
        this.PrivateaKeyBuffer = null
        //公钥二进制
        this.PublicKeyBuffer = null
        //钱包地址
        this.walletAdress = null
        //节点地址
        this.url = url
    }
    //生成私钥 输出公私钥对
    getPrivateKey(){
        this.PrivateaKeyBuffer = this.generatePrivateKey()
        return {
            "private_key":this.PrivateaKeyBuffer.hexSlice(),
            "public_key":this.getPublicKey()
        }
    }
    //导入私钥 输出公私钥对
    importPrivateKey(Pri_key){
        this.PrivateaKeyBuffer = this.loadPrivateKeyFromHexString(Pri_key)
        return {
            "private_key":this.PrivateaKeyBuffer.hexSlice(),
            "public_key":this.getPublicKey(Pri_key)
        }
    }
    //生成公钥
    getPublicKey(Pri_key){
        let yourPri_key 
        if(Pri_key) yourPri_key = Buffer.from(Pri_key,'hex')
        this.PublicKeyBuffer = this.generatePublicKey(yourPri_key||this.PrivateaKeyBuffer)
        return this.PublicKeyBuffer.hexSlice()
    }
    //生成钱包地址
    getWalletAdress(Pub_key){
        this.walletAdress = this.generateAddress(Pub_key)
        return this.walletAdress
    }
    //私钥签名
    signature(data,Pri_key_buffer){
        return this.signWithPrivtyKey(new Buffer(data),Buffer.from(Pri_key_buffer,'hex'))
    }
    //公钥验签
    verify(msg,sign,Pub_key){
        return this.valideWithPublicKey(new Buffer(msg),sign, Buffer.from(Pub_key,'hex'))
    }
    //transcation
    async transcation(method,url,txObj){
      let res =  await api.doTrasication(method,url,txObj)
      return res
    }
}

module.exports = Ecoball
