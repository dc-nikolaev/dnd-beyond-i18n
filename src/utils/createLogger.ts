import { createLogstory } from '@37bytes/logstory';

const createLogger = (name: string) =>
    createLogstory({
        name,
        logLevelState: {
            debug: true,
            log: true,
            warn: true,
            error: true
        }
    });

export default createLogger;
