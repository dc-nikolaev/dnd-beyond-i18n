import createLogger from "../utils/createLogger.ts";
import getTranslatedAbilitySkills, { AbilitySkill } from "../i18n/getTranslatedAbilitySkills.ts";
// import getTranslatedStats, { StatsItem } from "../i18n/getTranslatedStats.ts";

const logger = createLogger('xhrPatch');
const CHARACTER_API_URL = 'character-service.dndbeyond.com/character/v5/rule-data';

interface CharacterData {
    data: {
        abilitySkills?: AbilitySkill[];
        // stats?: StatsItem[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

function translate(object: CharacterData): CharacterData {
    logger.debug('Translating character data');

    if (object.data.abilitySkills) {
        object.data.abilitySkills = getTranslatedAbilitySkills(object.data.abilitySkills);
    }

    // Пока работает странно, нужно отладить
    // if (object.data.stats) {
    //     object.data.stats = getTranslatedStats(object.data.stats);
    // }

    return object;
}

const sourceOpen = XMLHttpRequest.prototype.open;

window.XMLHttpRequest.prototype.open = function(
    this: XMLHttpRequest,
    method: string,
    URL: string,
    async: boolean = true,
    username?: string,
    password?: string
) {
    const originalOnReadyStateChange = this.onreadystatechange;

    this.onreadystatechange = function(this: XMLHttpRequest, ev: Event) {
        if (this.readyState === 4 && this.status === 200 && URL.includes(CHARACTER_API_URL)) {
            const data = JSON.parse(this.responseText);
            const patchedData = translate(data);
            Object.defineProperty(this, 'responseText', { value: JSON.stringify(patchedData) });
            logger.debug('Response successfully patched');
        }

        if (originalOnReadyStateChange) {
            originalOnReadyStateChange.call(this, ev);
        }
    };

    return sourceOpen.apply(this, [method, URL, async, username, password]);
};
