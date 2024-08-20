/* istanbul ignore file */
import { LoggerService } from '@service/logger/logger.service';

export class LoggerServiceFake implements LoggerService {
  log(...args: any[]): void {
    console.log(args);
  }

  info(...args: any[]): void {
    console.info(args);
  }

  debug(...args: any[]): void {
    console.debug(args);
  }

  error(...args: any[]): void {
    console.error(args);
  }
}
