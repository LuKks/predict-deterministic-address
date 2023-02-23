const test = require('brittle')
const predictDeterministicAddress = require('./index.js')

test('basic', function (t) {
  const implementation = '0xb148d3c611eB4D3dEB1b2Cc30337cAbDF9F7f722'
  const deployer = '0x6a6Fd2c12d89F06251643Cc61e5e52Cef1E1304A'

  const salt1 = '0x0000000000000000000000000000000000000000000000000000000000000000'
  t.is(predictDeterministicAddress(implementation, salt1, deployer), '0x58A273e0F6871fA5D78c580A68061c85c27E7D96')

  const salt2 = '0x0000000000000000000000000000000000000000000000000000000000000001'
  t.is(predictDeterministicAddress(implementation, salt2, deployer), '0xdc86A379DCCEdB006A7C26A7FC94513FF6c51Ba7')

  const salt3 = '0x02f4ca75f074f72d3338877a66af489fd8b289ae9551bc798f9ad1952289b0c9'
  t.is(predictDeterministicAddress(implementation, salt3, deployer), '0x39d47ee6e2453191F9071d526dcE06aDc24c5939')
})

test('EVM', function (t) {
  const implementation = '0xb148d3c611eB4D3dEB1b2Cc30337cAbDF9F7f722'
  const salt = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const deployer = '0x6a6Fd2c12d89F06251643Cc61e5e52Cef1E1304A'

  t.is(predictDeterministicAddress(implementation, salt, deployer), '0x58A273e0F6871fA5D78c580A68061c85c27E7D96')
  t.is(predictDeterministicAddress(implementation, salt, deployer, 'EVM'), '0x58A273e0F6871fA5D78c580A68061c85c27E7D96')
})
