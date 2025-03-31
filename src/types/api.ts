// Типы для вложенных структур
type ColumnOption = {
	id: string;
	fk_column_id: string;
	title: string;
	color: string;
	order: number;
	base_id: string;
	fk_workspace_id: string;
};

type ColumnMeta = {
	defaultViewColOrder: number;
	defaultViewColVisibility: boolean;
};

type ColumnColOptions = {
	options: ColumnOption[];
};

export type NocoDBColumn = {
	id: string;
	source_id: string;
	base_id: string;
	fk_model_id: string;
	title: string;
	column_name: string;
	uidt: string;
	dt: string;
	np: number | null;
	ns: number | null;
	clen: number | null;
	cop: string | null;
	pk: boolean;
	pv: boolean | null;
	rqd: boolean;
	un: boolean;
	ct: string | null;
	ai: boolean;
	unique: boolean | null;
	cdf: string | null;
	cc: string | null;
	csn: string | null;
	dtx: string;
	dtxp: string;
	dtxs: string;
	au: boolean | null;
	validate: string;
	virtual: boolean | null;
	deleted: boolean | null;
	system: boolean;
	order: number;
	created_at: string;
	updated_at: string;
	meta: ColumnMeta;
	description: string;
	fk_workspace_id: string;
	readonly: boolean;
	colOptions: ColumnColOptions;
};

// Расширенный тип с Literal Type для uidt
// type NocoDBColumnStrict = Omit<NocoDBColumn, 'uidt'> & {
// 	uidt:
// 		| 'MultiSelect'
// 		| 'SingleSelect'
// 		| 'TextField'
// 		| 'Number'
// 		| 'DateTime'
// 		| string; // fallback для других значений
// };

// Тип для опций мультиселекта
// type MultiSelectOption = ColumnOption & {
// 	fk_column_id: string;
// };

// Утилитарные типы для работы с колонками
// type ColumnBase = Pick<
// 	NocoDBColumn,
// 	'id' | 'title' | 'column_name' | 'uidt' | 'order' | 'description'
// >;
