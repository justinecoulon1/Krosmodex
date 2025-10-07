import mapData from '../../../utils/sub_areas.json';
import { SubArea } from './map-canvas.utils';

export const ALL_SUB_AREA_COORDS = mapData.flatMap((area) => area.subAreaCoordinates);
export const MIN_X = Math.min(...ALL_SUB_AREA_COORDS.map((coord) => coord.x));
export const MAX_X = Math.max(...ALL_SUB_AREA_COORDS.map((coord) => coord.x));
export const MIN_Y = Math.min(...ALL_SUB_AREA_COORDS.map((coord) => coord.y));
export const MAX_Y = Math.max(...ALL_SUB_AREA_COORDS.map((coord) => coord.y));
export const CELL_SIZE = 6;
export const GREYED_AREAS = [
    9, 33, 71, 96, 84, 180, 182, 279, 451, 465, 466, 523, 600, 601, 602, 603, 604, 605, 606, 608, 609, 610, 611, 615,
    650, 651, 652, 834, 872, 873, 874, 878, 879, 883, 886, 896, 902, 951, 960, 969, 1017, 1019, 1023, 1024, 1026, 1029,
    1031, 1031, 320, 757, 758, 762, 763, 764, 765, 766, 773, 774, 809, 967,
];

export const UNDERGROUND_AREAS_IDS = [
    7, 25, 99, 100, 181, 200, 315, 316, 319, 461, 468, 469, 472, 492, 495, 816, 985, 1011,
];
export const OVERWORLD_AREAS: SubArea[] = mapData.filter(({ subAreaId }) => !UNDERGROUND_AREAS_IDS.includes(subAreaId));
export const UNDERGROUND_AREAS: SubArea[] = mapData.filter(({ subAreaId }) =>
    UNDERGROUND_AREAS_IDS.includes(subAreaId),
);
export const MAP_WIDTH = (MAX_X - MIN_X + 1) * CELL_SIZE;
export const MAP_HEIGHT = (MAX_Y - MIN_Y + 1) * CELL_SIZE;
export const MAP_GREYED_AREAS_COLOR = '#777777';
export const MAP_COLOR = '#ff8000';
export const MAP_COLOR_R = parseInt(MAP_COLOR.slice(1, 3), 16);
export const MAP_COLOR_G = parseInt(MAP_COLOR.slice(3, 5), 16);
export const MAP_COLOR_B = parseInt(MAP_COLOR.slice(5, 7), 16);
export const EXPLORED_MAP_COLOR = '#ffe9a1';
export const EXPLORED_MAP_COLOR_R = parseInt(EXPLORED_MAP_COLOR.slice(1, 3), 16);
export const EXPLORED_MAP_COLOR_G = parseInt(EXPLORED_MAP_COLOR.slice(3, 5), 16);
export const EXPLORED_MAP_COLOR_B = parseInt(EXPLORED_MAP_COLOR.slice(5, 7), 16);
export const MAP_BORDER_COLOR = '#000000';
export const MAP_BORDER_WIDTH = 1;

export const MAX_EXPLORATION_TIME = 60 * 60 * 1000;
export const REDRAW_PERIOD = 10_000;
