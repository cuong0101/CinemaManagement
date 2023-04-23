import { ColDef, ColumnApi, GridApi, IAggFunc, IsColumnFunc } from "ag-grid-community";

export interface CustomColDef extends ColDef {
	buttonDef?: {
		text?: string | Function;
		useRowData?: boolean;
		disabled?: boolean | Function;
		function?: (params: any) => void;
		iconName?: string;
		className?: string;
		message?: string;
	},
	buttonDefTwo?: {
		text?: string | Function;
		useRowData?: boolean;
		disabled?: boolean | Function;
		function?: (params: any) => void;
		iconName?: string;
		className?: string;
		message?: string;
	},
	buttonDefThree?: {
		text?: string | Function;
		useRowData?: boolean;
		disabled?: boolean | Function;
		function?: (params: any) => void;
		iconName?: string;
		className?: string;
		message?: string;
	},
	disableSelect?: boolean | IsColumnFunc,
	list?: any[] | IAggFunc,
	disabled?: boolean | IsColumnFunc,
	disableCheckbox?: boolean | IsColumnFunc,
	data?: string[] | boolean[] | number[],
	children?: CustomColDef[],
	validators?: string[],
	textFormatter?: IsColumnFunc | Function | any,
	property?: { key: string, value: string },
	listName?: string,
	api?: any,
	cellClass?: any,
	maxLength?: number,
	isSearch?: boolean,
	position?: number | any
}
export interface PaginationParamsModel {
	totalCount?: number | undefined;
	totalPage?: number | undefined;
	sorting?: string | undefined;
	skipCount?: number | undefined;
	pageSize?: number | undefined;
	pageNum?: number | undefined;
}
export interface GridParams {
	api: GridApi,
	columnApi: ColumnApi,
	editingStartedValue: string
}