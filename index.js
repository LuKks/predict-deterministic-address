const sha3 = require('@noble/hashes/sha3')

const PROXY_START = '0x3d602d80600a3d3981f3363d3d373d3d3d363d73'
const PROXY_END = '5af43d82803e903d91602b57fd5bf3'

module.exports = function predictDeterministicAddress (implementation, salt, deployer, virtualMachine) {
  const creationCode = PROXY_START + removeHexStart(implementation).toLowerCase() + PROXY_END
  const bytecode = keccak256(creationCode)
  const vm = getVM(virtualMachine)

  return toChecksumAddress(`0x${keccak256(`0x${[vm, deployer, salt, bytecode].map(removeHexStart).join('')}`).slice(-40)}`)
}

function getVM (vm) {
  if (!vm || vm === 'EVM') return 'ff' // Ethereum
  // Note: Disabled for now, checksum address needs to be compatible with Tron
  // if (vm === 'TVM') return '41' // Tron
  throw new Error('Invalid virtual machine code')
}

function keccak256 (value) {
  value = removeHexStart(value)
  return intsToHex(sha3.keccak_256(hexToInts(value)))
}

function removeHexStart (value) {
  if (value[0] === '0' && value[1] === 'x') return value.slice(2)
  return value
}

function toChecksumAddress (address) {
  if (typeof address !== 'string') throw new Error('Invalid address: ' + address)

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) throw new Error('Invalid address: ' + address)

  const addr = removeHexStart(address).toLowerCase()
  const hash = intsToHex(sha3.keccak_256(addr))
  let checksum = '0x'

  for (let i = 0; i < addr.length; i++) {
    // If ith character is 8 to f then make it uppercase
    const shouldUpperCase = parseInt(hash[i], 16) > 7

    checksum += shouldUpperCase ? addr[i].toUpperCase() : addr[i]
  }

  return checksum
}

function intsToHex (ints) {
  let hex = ''
  for (const int of ints) hex += toHex(int)
  return hex
}

function hexToInts (hex) {
  const ints = new Uint8Array(hex.length / 2)
  let count = 0

  for (let i = 0; i < ints.length; i++) {
    ints[i] = fromHex(hex.substr(count, 2))
    count += 2
  }

  return ints
}

function toHex (int) {
  return ('0' + int.toString(16)).slice(-2)
}

function fromHex (byte) {
  return parseInt(byte, 16)
}

// To allow constructor args then it should be an equivalent of: web3.utils.soliditySha3(bytecode) for keccak256(bytecode)
// https://github.com/web3/web3.js/blob/e4b25bfdcd7fc7b6b2baf800d7812ff6769dcbaa/packages/web3-utils/src/utils.js#L491
// https://github.com/web3/web3.js/blob/e4b25bfdcd7fc7b6b2baf800d7812ff6769dcbaa/packages/web3-utils/src/soliditySha3.js#L230
