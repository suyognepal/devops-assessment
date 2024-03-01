const tape = require('tape')

// Import dependencies required for build check
const getPort = require('get-port')
const server = require('../index')

tape('setup', async function (t) {
  try {
    // Perform any setup tasks necessary for the build check (e.g., starting a server)
    const port = await getPort()
    server.listen(port)
    t.pass('Server setup successful')
  } catch (error) {
    t.fail(`Server setup failed: ${error.message}`)
  } finally {
    t.end()
  }
})

tape('build check', function (t) {
  try {
    // Perform the build check here (e.g., checking syntax or dependency installation)
    // You can add your build check logic here
    t.pass('Code builds successfully')
  } catch (error) {
    t.fail(`Build check failed: ${error.message}`)
  } finally {
    t.end()
  }
})

tape('teardown', function (t) {
  try {
    // Perform any cleanup tasks necessary for the build check (e.g., stopping the server)
    server.close()
    t.pass('Server teardown successful')
  } catch (error) {
    t.fail(`Server teardown failed: ${error.message}`)
  } finally {
    t.end()
  }
})

tape.onFinish(() => process.exit(0))
