# predict-deterministic-address

JavaScript version of [Clones.predictDeterministicAddress](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/a6b8366980d8b28cbe4be7f1798719f0fac4cac1/contracts/proxy/Clones.sol#L61) from OpenZeppelin

```
npm i predict-deterministic-address
```

## Usage
```javascript
const predictDeterministicAddress = require('predict-deterministic-address')

const implementation = '0xb148d3c611eB4D3dEB1b2Cc30337cAbDF9F7f722'
const deployer = '0x6a6Fd2c12d89F06251643Cc61e5e52Cef1E1304A'

const salt1 = '0x0000000000000000000000000000000000000000000000000000000000000000'
console.log(predictDeterministicAddress(implementation, salt1, deployer))
// => 0x58A273e0F6871fA5D78c580A68061c85c27E7D96

const salt2 = '0x0000000000000000000000000000000000000000000000000000000000000001'
console.log(predictDeterministicAddress(implementation, salt2, deployer))
// => 0xdc86A379DCCEdB006A7C26A7FC94513FF6c51Ba7
```

## API

#### `const address = predictDeterministicAddress(implementation, salt, deployer)`

Computes the address of a clone deployed using [Clones.cloneDeterministic](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/a6b8366980d8b28cbe4be7f1798719f0fac4cac1/contracts/proxy/Clones.sol#L45) from OpenZeppelin.

## License
MIT
