/*
 * Copyright 2019 Rob Cannon
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or
 * without fee is hereby granted, provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO
 * THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT
 * SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR
 * ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 * CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE
 * OR PERFORMANCE OF THIS SOFTWARE.
 */


describe('logger', () => {

  beforeEach(() => {
    console.log = jest.fn();
  })

  test('set level and log', () => {
    const loggerFactory = require('./index');

    loggerFactory.setLogLevel('INFO');

    const logger = loggerFactory.get('test');

    logger.info('this is a test');

    expect(console.log.mock.calls.length).toBe(2);

    expect(console.log.mock.calls[0]).toEqual(
      ['[LogFactory] INFO:', 'Setting log level to INFO'],
    );

    expect(console.log.mock.calls[1]).toEqual(
      ['[test] INFO:', 'this is a test'],
    );
  })

  test('not log below level', () => {
    const loggerFactory = require('./index');

    loggerFactory.setLogLevel('ERROR');

    const logger = loggerFactory.get('test');

    logger.warn('this is a test');

    expect(console.log.mock.calls.length).toBe(0);
  })

  test('set level with string', () => {
    const loggerFactory = require('./index');

    const { LEVELS } = loggerFactory;

    loggerFactory.setLogLevel('TRACE');
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.TRACE);

    loggerFactory.setLogLevel('DeBuG');
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.DEBUG);

    loggerFactory.setLogLevel('info');
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.INFO);

    loggerFactory.setLogLevel('WARN');
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.WARN);

    loggerFactory.setLogLevel('ERROR');
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.ERROR);

    loggerFactory.setLogLevel('COOL');
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.ERROR);

    loggerFactory.setLogLevel();
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.ERROR);
  })

  test('set level with number', () => {
    const loggerFactory = require('./index');

    const { LEVELS } = loggerFactory;

    loggerFactory.setLogLevel(LEVELS.TRACE);
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.TRACE);

    loggerFactory.setLogLevel(LEVELS.DEBUG);
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.DEBUG);

    loggerFactory.setLogLevel(LEVELS.INFO);
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.INFO);

    loggerFactory.setLogLevel(LEVELS.WARN);
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.WARN);

    loggerFactory.setLogLevel(LEVELS.ERROR);
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.ERROR);

    loggerFactory.setLogLevel(42);
    expect(loggerFactory.getLogLevel()).toEqual(LEVELS.ERROR);
  })
})
