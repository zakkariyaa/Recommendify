const test = require('node:test');
const assert = require('node:assert');

const { request } = require('./helpers.js');

test('/ route returns html response', async () => {
    const { status, body } = await request('/', {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
    assert.equal(status, 200);
    assert.match(body, /<html.*>/i, 'Response should contain <html>');
});