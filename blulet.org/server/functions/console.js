import chalk from "chalk";

export default {
    log: (message) => process.stdout.write(`${message}\n`),
    info: (message) => process.stdout.write(`${chalk.blue("[INFO]")} ${message}\n`),
    notice: (message) => process.stdout.write(`${chalk.yellow("[NOTICE]")} ${message}\n`),
    warn: (message) => process.stdout.write(`${chalk.yellow("[WARNING]")} ${message}\n`),
    error: (message) => process.stderr.write(`${chalk.red("[ERROR]")} ${message}\n`),
    success: (message) => process.stdout.write(`${chalk.green("[SUCCESS]")} ${message}\n`),
    debug: (message) => process.stdout.write(`${chalk.magenta("[VERBOSE]")} ${message}\n`)
};