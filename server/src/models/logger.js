const fs = require('fs')

/**
 * Logger to file
 * @type {Function}
 */
class Logger {

    /**
     * Init logger
     * @param  {String} filename      The main filename
     * @param  {String} errorFilename The error filename
     * @return {Object}               This logger
     */
    constructor(filename, errorFilename) {
        console.log(filename)
        this.output = fs.createWriteStream(filename);
        this.errorOutput = fs.createWriteStream(errorFilename);
        this.console = new console.Console(this.output, this.errorOutput);
    }

    /**
     * Save log
     * @param  {String} output The string to save
     * @return {undefined}        Undefined
     */
    log(output) {
        this.console.log(output)
    }

    /**
     * Save error log
     * @param  {String} output The string to save
     * @return {undefined}        Undefined
     */
    error(output) {
        this.console.error(output)
    }
}

module.exports = Logger
