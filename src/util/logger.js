import pkg from "log4js";
const {configure, getLogger } = pkg;

const logDir = process.env.LOG_DIR;
const logFile = process.env.LOG_FILE;
const logLevel = process.env.LOG_LEVEL;

configure({
    appenders: {
        console: { type: 'stdout', layout: { type: "colored" } },
        dateFile: {
            type: 'dateFile',
            filename: `${logDir}/${logFile}`,
            layout: { type: "basic" },
            compress: true,
            keepFileExt: true,
            numBackups: 5,
        }
    },
    categories: {
        default: { appenders: ['console', 'dateFile'], level: logLevel }
    }
});

export const logger = getLogger();