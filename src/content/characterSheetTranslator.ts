import createLogger from "../utils/createLogger.ts";
// https://github.com/crxjs/chrome-extension-tools/issues/409
import pathToXHRPatch from '../injectable/xhrPatch.ts?script&module'

const logger = createLogger('characterSheetTranslator');

const scriptElement = Object.assign(
    document.createElement('script'),
    {
        src: chrome.runtime.getURL(pathToXHRPatch),
        type: 'module'
    }
) as HTMLScriptElement;
logger.debug('scriptElement constructed', scriptElement);

scriptElement.addEventListener('load', (event) => {
    logger.debug('scriptElement loaded, removing it from html...');
    ((event.target) as HTMLScriptElement).remove();
    logger.debug('scriptElement removed from html...');
});

(document.head || document.documentElement).appendChild(scriptElement);
logger.debug('scriptElement appended to html!', scriptElement);
