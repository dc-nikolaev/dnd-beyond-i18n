import createLogger from '../utils/createLogger.ts';
import { produce } from 'immer';

const logger = createLogger('createLogger');

const titleMap: Record<string, string> = {
    "Athletics": "Атлетика",
    "Acrobatics": "Акробатика",
    "Sleight of Hand": "Ловкость рук",
    "Stealth": "Скрытность",
    "Arcana": "Магия",
    "History": "История",
    "Investigation": "Расследование",
    "Nature": "Природа",
    "Religion": "Религия",
    "Animal Handling": "Уход за животными",
    "Insight": "Проницательность",
    "Medicine": "Медицина",
    "Perception": "Восприятие",
    "Survival": "Выживание",
    "Deception": "Обман",
    "Intimidation": "Запугивание",
    "Performance": "Выступление",
    "Persuasion": "Убеждение"
};

export interface AbilitySkill {
    id: number;
    entityTypeId: number;
    stats: number;
    name: string;
    description: string;
}

const getTranslatedAbilitySkills = (sourceAbilitySkills: AbilitySkill[]) => {
    return produce(sourceAbilitySkills, (skills) =>
        skills.forEach((skill) => {
            if (!skill.name || !titleMap[skill.name]) {
                logger.warn('strange skill', skill);
            }

            skill.name = `${titleMap[skill.name]}`;
            // skill.name = `${titleMap[skill.name]} (${skill.name})`;
        })
    );
}

export default getTranslatedAbilitySkills;
