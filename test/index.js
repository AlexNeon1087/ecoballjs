const Ecoball = require('./../src/index')
const {randomBytes} = require('crypto')
let ecoball = new Ecoball()
let privitkey = "95187b89cb1d07e47badb30149522c515dbbcef112ddcc350622fbbbe7520110"
let msg = randomBytes(32)
describe('#getPrivateKey()', function() {
    it('You created a privatekey and a publicKey', function() {
        console.log(ecoball.getPrivateKey())
    })
})
describe('#importPriKey()', function() {
    it('You imported a privatekey and created a publicKey', function() {
        publickey = ecoball.importPrivateKey(privitkey).public_key
        console.log(ecoball.importPrivateKey(privitkey))
    })
})
describe('#getWalletAdress()', function() {
    it('You can get Wallet Adress', function() {
        console.log(ecoball.getWalletAdress(privitkey))
    })
})

describe('#signature()', function() {
    it('You can sign your message with privatekey', function() {
        console.log(ecoball.signature(msg,privitkey))
    })
})

describe('#verify()', function() {
    it('You can verify your message with publickey', function() {
        console.log(ecoball.verify(msg,signatureMsg,publickey))
    })
})

describe('#transcation()', function() {
    it('You transcation your coin', function() {
       ecoball.transcation('post','/transcation',msg).then(res=>{
           console.log(res)
       })
    })
})
 