const uuid = require('uuid/v4')
const assert = require('assert')
const lodash = require('lodash')

const Defaults = p => {
  return {
    id: uuid(),
    type: 'basic',
    created: Date.now(),
    updated: Date.now(),
    callbackURL: null,
    to: null,
    from: null,
    status: 'pending', // 'waitConfirmation', 'completed'
    confirmations: 0,
    ...p
  }
}

module.exports = (config, table) => {

  return {
    ...table,
    create(amount, to) {
      assert(amount, 'requires amount')
      assert(lodash.isFinite(amount), 'requires amount')
      assert(amount >= config.coinLimit, 'requires amount > 0.001')
      assert(to, 'requires to')

      const tx = Defaults({ to, amount })
      return table.set(tx)
    }
  }
}

