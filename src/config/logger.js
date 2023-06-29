import winston, {transports} from "winston"
import config from "./config.js"

const customLevelOptions = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4
    },
    colors:{
        fatal:"red",
        error:"magenta",
        warning:"yellow",
        info:"blue",
        debug:"white"
    } 
}
 
const devLogger= winston.createLogger({
    levels:customLevelOptions.levels,
    transports:[
        new winston.transports.Console(
            {
                level:"debug",
                format:winston.format.combine(
                    winston.format.prettyPrint(),
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: "warning",
                format: winston.format.simple()
            }
        )
    ]
})

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "info",}),
        new winston.transports.File({filename: './errors.log', level: 'warn'})
    ]
});
export const addLogger = (req, res, next) => {
    if (config.environment === 'production'){
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    req.logger.info(`${req.method} in ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    next();}