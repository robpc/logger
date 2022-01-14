declare class Logger {
  constructor(name: string);

  trace(...args: any[]): void;
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...arg: any[]): void;
  error(...args: any[]): void;
}

type LogLevelName = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
type LogLevels = Record<LogLevelName, number>;

declare interface LoggerFactory {
  LEVELS: LogLevels;

  getLogLevel: () => LogLevelName;

  setLogLevel: (level: string | number) => void;

  setStderrOutput: (flag: boolean) => void

  /**
   * Creates or returns an existing logger create with the
   * name param.
   */
  get: (name: string) => Logger,
}

declare const factory: LoggerFactory
export = factory;
