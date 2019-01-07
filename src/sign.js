const {randomBytes} = require('crypto')
const secp256k1 = require('secp256k1')
const SHA3 = require('keccakjs')


class sign  {
    signWithPrivtyKey(data,privKey) {
       return secp256k1.sign(data,privKey)
    }
    valideWithPublicKey(msg,sigObj,pubKey) {
        // console.log(msg,sigObj,pubKey)
        return secp256k1.verify(msg, sigObj.signature, pubKey)
    }
    /*
     * 私钥：secp256k1(ECDSA)的私钥(256 bits 随机数)
     */
    //生成随机私钥
    generatePrivateKey() {
        let private_key
        do {
            private_key = randomBytes(32)
        } while (!secp256k1.privateKeyVerify(private_key));
        return private_key
    }

    //导入16进制编码的私钥
    //e.g. openssl rand -hex 32
    loadPrivateKeyFromHexString(hex_string) {
        if (hex_string.slice(0, 2) == '0x') {
            hex_string = hex_string.slice(2);
        }
        if (hex_string.length != 64) {
            return null;
        }
        return new Buffer(hex_string, 'hex')
    }
    /*
     * 公钥：在secp256k1规范下，由私钥和规范中指定的生成点计算出的坐标(x, y)
     *      非压缩格式公钥： [前缀0x04] + x + y (65字节)
     *      压缩格式公钥：[前缀0x02或0x03] + x ，其中前缀取决于 y 的符号
     */
    //生成公钥: 输入的私钥应当是buffer
    generatePublicKey(private_key) {
        let public_key = secp256k1.publicKeyCreate(private_key)
        return public_key //包含了前缀
    }

    /*
     * 地址：公钥的sha3-256编码的后20字节，16进制编码的字符串
     */
    generateAddress(public_key) {
        let h = new SHA3(256)
        h.update(public_key.slice(1)) //去掉前缀
        return h.digest('hex').slice(-40)
    }

}

module.exports = sign