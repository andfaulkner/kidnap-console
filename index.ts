
export type Stores = { log: string[], warn: string[], error: string[], dir: string[] };
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
export const blockLogOutput = <T>(fn: () => T): StoreAndResultTuple<T> => {
    const storesInterim = {
        log:   { logged: [], orig: global.console.log   },
        dir:   { logged: [], orig: global.console.dir   },
        warn:  { logged: [], orig: global.console.warn  },
        error: { logged: [], orig: global.console.error },
    };

    // Stub all the console methods
    Object.keys(storesInterim).forEach((logFn) => {
        storesInterim[logFn].orig = global.console[logFn];
        global.console[logFn] = (...msgs) => {
            const message = msgs.join('');
            storesInterim[logFn].logged.push(message);
        }
    });

    // Run the function with the 3 main console methods stubbed.
    const result = fn();

    // Restore all the console methods after function done running.
    Object.keys(storesInterim).forEach((fn) => global.console[fn] = storesInterim[fn].orig);

    // Create export-friendly stores object.
    const stores = {
        log: storesInterim.log.logged,
        warn: storesInterim.warn.logged,
        dir: storesInterim.dir.logged,
        error: storesInterim.error.logged,
    } as Stores;

    return { stores, result };
};

export { blockLogOutput as kidnapConsole }
export { blockLogOutput as kidnapLogs }
