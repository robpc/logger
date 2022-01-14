# @robpc/logger

Simple logging library for use in node and the browser. Intended to be a extremely light-weight version, has only one file and no dependencies.

## Installation

    npm install --save @robpc/logger

## Usage

_index.js_

    const LoggerFactory = require('@robpc/logger');

    // Set to push output to stderr (useful for node scripts)
    // NOTE: Must be called before setLogLevel to prevent all printing to stdout
    LoggerFactory.setStderrOutput(true);

    // Set once at the top of your application and applies everywhere
    LoggerFactory.setLogLevel('DEBUG'); // or LoggerFactory.LEVELS.INFO or 2
    const logger = LoggerFactory.get('main');

    const data = { rob: 1 };

    logger.debug('Good Morning, Rob!', 'data:', data);

_other.js_

    const LoggerFactory = require('@robpc/logger');

    const logger = LoggerFactory.get('other');

    logger.info('Good Evening, Rob!');

_console output_

    [main] DEBUG: Good Morning, Rob! data: { rob: 1 }
    [other] INFO: Good Evening, Rob!