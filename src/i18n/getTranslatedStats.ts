import createLogger from '../utils/createLogger.ts';
import { produce } from 'immer';

const logger = createLogger('createLogger');

const titleMap: Record<string, string> = {
    "Strength": "Сила",
    "Dexterity": "Ловкость",
    "Constitution": "Телосложение",
    "Intelligence": "Интеллект",
    "Wisdom": "Мудрость",
    "Charisma": "Харизма",
};

const keyMap: Record<string, string> = {
    "STR": "СИЛ",
    "DEX": "ЛВК",
    "CON": "ТЕЛ",
    "INT": "ИНТ",
    "WIS": "МДР",
    "CHA": "ХАР",
};

export interface StatsItem {
    id: number;
    entityTypeId: number;
    key: string;
    name: string;
    compendiumText: string;
}

const getTranslatedStats = (sourceStats: StatsItem[]) => {
    return produce(sourceStats, (stats) =>
        stats.forEach((statsItem) => {
            if (!statsItem.name || !titleMap[statsItem.name]) {
                logger.warn('strange statsItem', statsItem);
            }

            statsItem.name = `${titleMap[statsItem.name]}`;
            // statsItem.name = `${titleMap[statsItem.name]} (${statsItem.name})`;

            statsItem.key = `${keyMap[statsItem.key]}`;
            // statsItem.key = `${titleMap[statsItem.key]} (${statsItem.key})`;
        })
    );
}

export default getTranslatedStats;
