import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  /**
   * Method to log in console an error with enough information to track it down
   * @param message the exception caught
   * @param module the name of the module of where id being called from.
   * @param method the name of the method of where if being called from.
   */
  logError(message: any, module: string, method: string) {
    console.log('------------------------------------------------------------');
    console.warn('Handled Error, dropping log:');
    console.warn('At Module: ' + module.toUpperCase());
    console.warn('At Method: ' + method.toUpperCase());
    console.warn('Error Message following 👇');
    console.error(message);
    console.log('------------------------------------------------------------');
  }
}
