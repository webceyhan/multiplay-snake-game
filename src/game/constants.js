// define Bootstrap theme colors
const colors = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
};

// define constants
export const GRID_SIZE = 600;
export const CELL_COUNT = 20;
export const CELL_SIZE = GRID_SIZE / CELL_COUNT;
export const GRID_COLOR = colors.dark;
export const SNAKE_COLOR = colors.primary;
export const FOOD_COLOR = colors.warning;
