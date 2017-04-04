# kidnap-console

*   Makes console log output testing a breeze.

*   Capture log output by wrapping functions that do console calls.
*   Stores both of the following from each wrapped function:
    *   1)  All values that get passed to console.log, console.warn, console.dir, or console.error;
    *   2)  Return value of the function.
*   Prevents log from displaying on the console

## Purpose
*   Unit testing of console output
    *   (None of the existing solutions to this were really working for me)

----
## Usage

Example 1:

    // You can also import kidnapLogs or kidnapConsole. They are aliases.
    import { blockLogOutput } from 'kidnap-console';

    const capturedLogs = blockLogOutput(() => console.log('try to log this'));
    // [[no output to console occurs]]

    console.log(capturedLogs.stores.log);
    // => ['try to log this']
  

Example 2:

    function logThings() {
        console.dir('hello dir');
        console.log('hello log');
        console.warn('hello warn');
        console.error('hello error');
        return 'my return value';
    }

    const capturedLogs = blockLogOutput(logThings); 
    // [[no output to console occurs]]

    //
    // Captures the return value of the function
    //
    console.log(capturedLogs.result);
    // => 'my return value'

    console.log(capturedLogs.stores.log);
    // => ['hello log']

    console.log(capturedLogs.stores.dir);
    // => ['hello dir']
    
    console.log(capturedLogs.stores.warn);
    // => ['hello warn']
    
    console.log(capturedLogs.stores.error);
    // => ['hello error']

