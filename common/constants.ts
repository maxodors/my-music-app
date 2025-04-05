import { TableColumn } from './types';

export const columnsOrder = [
	'#',
	'Title',
	'Project',
	'Setting',
	'Timeline',
	'Type',
	'GenreTTRPG',
	'Scene',
	'Mood',
	'Space',
	'Repetitiveness',
	'Volume',
	'Tempo',
	'SongGenre',
	'Instruments',
	'SongLength',
	'Location',
	'Unique',
	'Comments',
];

export const columnsTitles: Record<string, string> = {
	'#': '#',
	Title: 'Название',
	Project: 'Проект',
	Setting: 'Сеттинг',
	Timeline: 'Истор. Время',
	Type: 'Тип',
	GenreTTRPG: 'Жанр НРИ',
	Scene: 'Сцена',
	Mood: 'Настроение',
	Space: 'Пространство',
	Repetitiveness: 'Репетативность',
	Volume: 'Громкость',
	Tempo: 'Темп',
	SongGenre: 'Жанр Музыки',
	Instruments: 'Инструменты',
	SongLength: 'Длина',
	Location: 'Местность',
	Unique: 'Разное',
	Comments: 'Комментарии',
	Link: 'Ссылка',
};

export const initTableColumns: TableColumn[] = [
	{ name: 'Название', isVisible: true },
	{ name: 'Жанр музыки', isVisible: false },
	{ name: 'Длина', isVisible: false },
	{ name: 'Громкость', isVisible: false },
	{ name: 'Истор. время', isVisible: false },
	{ name: 'Инструменты', isVisible: false },
	{ name: 'Тип', isVisible: true },
	{ name: 'Темп', isVisible: true },
	{ name: 'Сцена', isVisible: true },
	{ name: 'Настроение', isVisible: true },
	{ name: 'Репетативность', isVisible: true },
	{ name: 'Проект', isVisible: false },
	{ name: 'Жанр НРИ', isVisible: false },
	{ name: 'Сеттинг', isVisible: false },
	{ name: 'Пространство', isVisible: false },
	{ name: 'Местность', isVisible: false },
	{ name: 'Разное', isVisible: false },
	{ name: 'Комментарии', isVisible: false },
];

export const FILTER_CATEGORIES = columnsOrder
  .filter((col) => !['#', 'Title', 'Comments'].includes(col))
  .map((col) => columnsTitles[col]);

export const BASE_URL = 'https://app.nocodb.com';
export const ORGS = 'wl8lp0fk';
export const PROJECT_ID = 'pjpoxvsm0dvltpe';
export const TABLE_ID = 'm4ylgz2cjhybe4r';
export const VIEW_ID = 'vw1m1manwrq5fmp5';
export const API_TOKEN = '5gnZxL7hkZs7X9ccjjqMmV7M17_sIDT_nedtkoAQ';

export const HEADERS = {
	'xc-token': API_TOKEN,
	'Content-Type': 'application/json',
};
