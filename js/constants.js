
export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d', { alpha: false});
export const WIDTH = window.innerWidth;
export const HEIGHT = window.innerHeight;
export const MAX_VELOCITY = 30;
export const MAP_LENGTH = 1000;
export const ROW_PER_VIEW = 3;
export const COL_PER_VIEW = 12;
export const HALF_WIDTH = WIDTH/2;
export const FIRE_RATE_MAX = 3;
export const WALK_SPEED = 3;
export const MAP_ROW_SIZE = MAP_LENGTH * COL_PER_VIEW
