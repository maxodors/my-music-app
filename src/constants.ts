export const columnOrder = [
  '#', 'Title', 'Project', 'Setting', 'Timeline', 'Type', 'GenreTTRPG',
  'Scene', 'Mood', 'Space', 'Repetitiveness', 'Volume',
  'Tempo', 'SongGenre', 'Instruments', 'SongLength', 'Location', 'Unique', 'Comments'
];

export const FILTER_CATEGORIES = columnOrder.filter(col => !["#", "Title", "Comments"].includes(col));

  // src/config/tableConfig.ts

export const columnTitles: Record<string, string> = {
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
};
