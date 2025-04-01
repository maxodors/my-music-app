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

export const FILTER_CATEGORIES = columnsOrder.filter(
	(col) => !['#', 'Title', 'Comments'].includes(col)
);

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

// API документация
// https://meta-apis-v2.nocodb.com/#tag/Fields/operation/db-table-column-create

// Типовой объект из базы данных
// {
//   "Id": 1,
//   "Название": "Yaharo! — OreGairu", Title
//   "Сеттинг": "Японская Школа",
//   "Истор. Время": "2010",
//   "Тип": "Инструментал",
//   "Жанр НРИ": "Повседневность",
//   "Сцена": "Рутина,Путешествие",
//   "Настроение": "Возвышенное",
//   "Пространство": "Открытое",
//   "Репетативность": "Навязчивая (Несколько Раз)",
//   "Громкость": "Средне",
//   "Темп": "Выше Среднего",
//   "Жанр Музыки": null,
//   "Длина": "Короткий (До 1 Минуты)",
//   "Местность": null,
//   "Разное": null,
//   "Комментарии": null,
//   "Ссылка": "https://youtu.be/1Rpe0vLNj0M?si=KtLYTz9R_yQLpvy8",
//   "Проект": "Исчезающие Дни"
// }

// Добавить новый трек в базу данных
// fetch(`${BASE_URL}/api/v1/db/data/${ORGS}/${PROJECT_ID}/${TABLE_ID}`, {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'xc-token': `${API_TOKEN}`,
// 	},
// 	body: JSON.stringify(data), // См. структуру объекта
// });

// Выборочный запрос к колонкам через куери
// https://app.nocodb.com/api/v2/meta/columns/{ColumnID}
// https://app.nocodb.com/api/v2/tables/m4ylgz2cjhybe4r/records?fields=Title,Проект

// Добавление в базу нового пункта. Нужно делать копию объекта
// fetch(`${BASE_URL}/api/v1/db/data/${ORGS}/${PROJECT_ID}/${TABLE_ID}`, {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'xc-token': `${API_TOKEN}`,
// 	},
// 	body: JSON.stringify(
// {
//   "colOptions": {
// 		"options": [
// 			{
// 				"title": "Жанр1",
// 				"color": "fff"
// 			}
// 		]
// }
// ), // См. структуру объекта
// });

// https://meta-apis-v2.nocodb.com/#tag/Fields/operation/db-table-column-get

// Добавление нового цвета для опции
// https://app.nocodb.com/api/v2/meta/columns/{id столбца в базе данных}
// payload для запроса - ВАЖНО! Такой запрос перезаписывает все опции в столбце, потому
// каждый раз необходимо пересобирать объект, добавляя новые опции в конец.
// {
//   "colOptions": {
//     "options": [
//       {
//         "title": "fetch-опция 1",
//         "color": "#FF0000"
//       },
//         {
//         "title": "fetch-опция 2",
//         "color": "#FF0000"
//       }
//     ]
//   }
// }
