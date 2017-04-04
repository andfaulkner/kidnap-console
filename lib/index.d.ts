export declare type Stores = {
    log: string[];
    warn: string[];
    error: string[];
};
export interface StoreAndResultTuple<T> {
    stores: Stores;
    result: T;
}
/**
 * Prevents console.error messages emitted by code from reaching the console for given function.
 * Catches it in an object instead.
 *
 * @param  {Function} fn - function to run without showing logs, warnings, or errors.
 * @return {Object<{stores, result}>} info object, with 2 parts:
 *              - stores: object containing arrays of items logged to the console from running given fn.
 *                        Has keys for each major log type: log (corresponding to console.log), warn, and error.
 *                        Data gets stored in array at stores[logType].logged (e.g. stores.warn.logged).
 *              - result:
 */
export declare const blockLogOutput: <T>(fn: () => T) => StoreAndResultTuple<T>;
