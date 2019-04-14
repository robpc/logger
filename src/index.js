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
/* eslint-disable no-console */
const invertObject = data => Object.keys(data)
  .reduce(
    (obj, key) => Object.assign({}, obj, { [data[key]]: key }),
    {},
  );

const LogLevels = Object.freeze({
  TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4,
});

const LogLevelNames = Object.freeze(invertObject(LogLevels));

let logLevel = LogLevels.ERROR;

const log = (name, level, ...args) => {
  if (level >= logLevel) {
    const levelName = LogLevelNames[level];
    console.log(`[${name}] ${levelName}:`, ...args);
  }
};

class Logger {
  constructor(name) {
    this.name = name;
  }

  trace(...args) {
    log(this.name, LogLevels.TRACE, ...args);
  }

  debug(...args) {
    log(this.name, LogLevels.DEBUG, ...args);
  }

  info(...args) {
    log(this.name, LogLevels.INFO, ...args);
  }

  warn(...args) {
    log(this.name, LogLevels.WARN, ...args);
  }

  error(...args) {
    log(this.name, LogLevels.ERROR, ...args);
  }
}

const logger = new Logger('LogFactory');

const loggerDirectory = {};

const LoggerFactory = {
  LEVELS: LogLevels,

  getLogLevel: () => logLevel,

  setLogLevel: (level) => {
    let newLevel = undefined;
    if (level && typeof level === 'string') {
      newLevel = LogLevels[level.toUpperCase()];
    } else if (typeof level === 'number' && Object.values(LogLevels).includes(level)) {
      newLevel = level;
    }

    if (newLevel !== undefined && newLevel !== null) {
      logLevel = newLevel;
      logger.info(`Setting log level to ${LogLevelNames[logLevel]}`);
    } else {
      logger.error(
        `Could not set log level from '${level}'.`,
        `Valid options are ${Object.keys(LogLevels).join(', ')} or ${Object.values(LogLevels).join(', ')}`,
      );
    }
  },

  get: (name) => {
    if (!loggerDirectory[name]) {
      loggerDirectory[name] = new Logger(name);
    }
    return loggerDirectory[name];
  }
}

module.exports = LoggerFactory;
