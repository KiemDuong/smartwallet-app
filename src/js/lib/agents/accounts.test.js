/* global describe: true, it: true */
var expect = require('chai').expect

import * as settings from 'settings'
import AccountsAgent from './accounts'

const DUMMY_JSON_HEADERS = {
  get: (field) => ({
    'Content-Type': 'application/json'
  })[field]
}
const DUMMY_HTML_HEADERS = {
  get: (field) => ({
    'Content-Type': 'text/html'
  })[field]
}

describe('AccountsAgent', function () {
  describe('#register', function () {
    it('should be able to register an account', async function () {
      const agent = new AccountsAgent()
      agent.http._fetch = async (url, options) => {
        expect(options.method).to.equal('POST')
        expect(options.body).to.equal('username=user&password=pass&' +
          'email=email&name=name')
        expect(url).to.equal(`${settings.proxy}/register`)
        return {
          status: 200,
          json: () => ({ foo: 5 }),
          headers: DUMMY_JSON_HEADERS
        }
      }
      const result = await agent.register('user', 'pass', 'email', 'name')
      expect(result).to.deep.equal({ foo: 5 })
    })
  })

  describe('#updateEmail', function () {
    it('should be able to update email', async function () {
      const agent = new AccountsAgent()
      agent.httpProxied._fetch = async (url, options) => {
        expect(url).to.equal(`${settings.proxy}/proxy?url=http://my-test-id`)
        expect(options.method).to.equal('PATCH')
        expect(options.body).to.equal(
          'INSERT DATA { <http://my-test-id> ' +
          '<http://xmlns.com/foaf/0.1/mbox> ' +
          '<mailto:test@test.com>  };\n')
        expect(options.headers['Content-Type'])
          .to.equal('application/sparql-update')

        return ({
          status: 200,
          responseText: 'TEST',
          headers: DUMMY_HTML_HEADERS
        })
      }
      await agent.updateEmail('http://my-test-id', 'test@test.com')
    })
  })

  describe('#checkLogin', function () {
    it('should be able to check if the user is (still) logged in',
      async function () {
        const agent = new AccountsAgent()
        agent.httpProxied._fetch = async (url, options) => {
          expect(url).to.equal(`${settings.proxy}/proxy?url=http://my-test-id`)
          expect(options.method).to.equal('PATCH')
          expect(options.body).to.equal('')
          expect(options.headers['Content-Type'])
                .to.equal('application/sparql-update')

          return ({
            status: 200,
            responseText: 'TEST',
            headers: DUMMY_HTML_HEADERS
          })
        }
        await agent.checkLogin('http://my-test-id')
      }
    )
  })

  describe('#login', function () {
    it('should be able to log in a user', async function () {
      const agent = new AccountsAgent()
      agent.http._fetch = async (url, options) => {
        expect(options.method).to.equal('POST')
        expect(options.body).to.equal('username=user&password=pass')
        expect(url).to.equal(`${settings.proxy}/login`)
        expect(options.headers['Content-Type'])
              .to.equal('application/x-www-form-urlencoded; charset=UTF-8')
        return {
          status: 200,
          json: () => ({ foo: 5 }),
          headers: DUMMY_JSON_HEADERS
        }
      }
      const result = await agent.login('user', 'pass')
      expect(result).to.deep.equal({ foo: 5 })
    })

    it('should correctly handle login failures', async function () {
      const agent = new AccountsAgent()
      agent.http._fetch = async (url, options) => {
        expect(options.method).to.equal('POST')
        expect(options.body).to.equal('username=user&password=pass')
        expect(url).to.equal(`${settings.proxy}/login`)
        expect(options.headers['Content-Type'])
              .to.equal('application/x-www-form-urlencoded; charset=UTF-8')
        return ({
          status: 403,
          statusText: 'Nope',
          headers: DUMMY_HTML_HEADERS
        })
      }
      await expect(agent.login('user', 'pass'))
                  .to.be.rejectedWith(Error, 'Nope')
    })
  })

  describe('#logout', function () {
    it('should be able to log out a user', async function () {
      const agent = new AccountsAgent()
      agent.http._fetch = async (url, options) => {
        expect(options.method).to.equal('POST')
        expect(options.body).to.be.null
        expect(url).to.equal(`${settings.proxy}/logout`)
        expect(options.headers['Content-Type'])
              .to.equal('application/x-www-form-urlencoded; charset=UTF-8')
        return {
          status: 200,
          json: () => ({ foo: 5 }),
          headers: DUMMY_JSON_HEADERS
        }
      }
      const result = await agent.logout()
      expect(result).to.deep.equal({ foo: 5 })
    })
  })

  describe('#verifyEmail', function () {
    it('should be able verify an e-mail address', async function () {
      const agent = new AccountsAgent()
      agent.http._fetch = async (url, options) => {
        expect(url).to.equal(`${settings.proxy}/verifyemail`)
        expect(options.method).to.equal('POST')
        expect(options.body)
              .to.equal('username=http%3A%2F%2Fmy-test-id&code=verysecret')
        expect(options.headers['Content-Type'])
              .to.equal('application/x-www-form-urlencoded; charset=UTF-8')

        return {
          status: 200,
          json: () => ({ email: 'yougot@mail.com' }),
          headers: DUMMY_JSON_HEADERS
        }
      }
      const result = await agent.verifyEmail('http://my-test-id', 'verysecret')
      expect(result.email).to.equal('yougot@mail.com')
    })

    it('should correctly handle verification failures', async function () {
      const agent = new AccountsAgent()
      agent.http._fetch = async (url, options) => {
        expect(url).to.equal(`${settings.proxy}/verifyemail`)
        expect(options.method).to.equal('POST')
        expect(options.body)
              .to.equal('username=http%3A%2F%2Fmy-test-id&code=verysecret')
        expect(options.headers['Content-Type'])
              .to.equal('application/x-www-form-urlencoded; charset=UTF-8')
        return ({
          status: 403,
          statusText: 'Nope',
          headers: DUMMY_HTML_HEADERS
        })
      }
      await expect(agent.verifyEmail('http://my-test-id', 'verysecret'))
                  .to.be.rejectedWith(Error, 'Nope')
    })
  })
})
