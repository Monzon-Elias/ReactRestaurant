import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SearchBar from './SearchBar';

// Mock del componente TopRatedRestaurants
vi.mock('../TopRatedRestaurants/TopRatedRestaurants', () => ({
    default: function MockTopRatedRestaurants({ setRestaurants, allRestaurants }) {
        return (
            <button 
                data-testid="top-rated-button"
                onClick={() => {
                    const filtered = allRestaurants.filter(r => r.info.avgRating >= 4.5);
                    setRestaurants(filtered);
                }}
            >
                Top Rated Restaurants
            </button>
        );
    }
}));

describe('SearchBar', () => {
    const mockSetRestaurants = vi.fn();
    const mockAllRestaurants = [
        {
            info: {
                name: 'Pizza Palace',
                avgRating: 4.8,
                cuisines: ['Pizza', 'Italian']
            }
        },
        {
            info: {
                name: 'Burger House',
                avgRating: 4.2,
                cuisines: ['Burgers', 'Fast Food']
            }
        },
        {
            info: {
                name: 'Sushi Master',
                avgRating: 4.9,
                cuisines: ['Japanese', 'Sushi']
            }
        },
        {
            info: {
                name: 'Taco Fiesta',
                avgRating: 3.8,
                cuisines: ['Mexican', 'Tacos']
            }
        }
    ];

    beforeEach(() => {
        mockSetRestaurants.mockClear();
    });

    // Test 1: Verificar que se renderiza correctamente
    it('should render search input and button', () => {
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        // Verificar que existe el input de búsqueda
        expect(screen.getByPlaceholderText('Search for restaurants...')).toBeInTheDocument();
        
        // Verificar que existe el botón de búsqueda
        expect(screen.getByRole('button', { name: '🔎' })).toBeInTheDocument();
        
        // Verificar que existe el componente TopRatedRestaurants
        expect(screen.getByTestId('top-rated-button')).toBeInTheDocument();
    });

    // Test 2: Verificar que el input maneja cambios de texto
    it('should update search term when typing', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Escribir en el input
        await user.type(searchInput, 'Pizza');
        
        // Verificar que el valor del input se actualiza
        expect(searchInput).toHaveValue('Pizza');
    });

    // Test 3: Verificar búsqueda al presionar Enter
    it('should filter restaurants when pressing Enter', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Escribir y presionar Enter
        await user.type(searchInput, 'Pizza');
        await user.keyboard('{Enter}');
        
        // Verificar que se llama setRestaurants con los restaurantes filtrados
        expect(mockSetRestaurants).toHaveBeenCalledWith([
            {
                info: {
                    name: 'Pizza Palace',
                    avgRating: 4.8,
                    cuisines: ['Pizza', 'Italian']
                }
            }
        ]);
        
        // Verificar que el input se limpia después de la búsqueda
        expect(searchInput).toHaveValue('');
    });

    // Test 4: Verificar búsqueda al hacer clic en el botón
    it('should filter restaurants when clicking search button', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        const searchButton = screen.getByRole('button', { name: '🔎' });
        
        // Escribir y hacer clic en el botón
        await user.type(searchInput, 'Burger');
        await user.click(searchButton);
        
        // Verificar que se llama setRestaurants con los restaurantes filtrados
        expect(mockSetRestaurants).toHaveBeenCalledWith([
            {
                info: {
                    name: 'Burger House',
                    avgRating: 4.2,
                    cuisines: ['Burgers', 'Fast Food']
                }
            }
        ]);
        
        // Verificar que el input se limpia después de la búsqueda
        expect(searchInput).toHaveValue('');
    });

    // Test 5: Verificar búsqueda case-insensitive
    it('should perform case-insensitive search', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Buscar con mayúsculas
        await user.type(searchInput, 'PIZZA');
        await user.keyboard('{Enter}');
        
        // Verificar que encuentra 'Pizza Palace' aunque la búsqueda sea en mayúsculas
        expect(mockSetRestaurants).toHaveBeenCalledWith([
            {
                info: {
                    name: 'Pizza Palace',
                    avgRating: 4.8,
                    cuisines: ['Pizza', 'Italian']
                }
            }
        ]);
    });

    // Test 6: Verificar búsqueda con espacios en blanco
    it('should trim whitespace from search term', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Buscar con espacios
        await user.type(searchInput, '  Pizza  ');
        await user.keyboard('{Enter}');
        
        // Verificar que encuentra 'Pizza Palace' ignorando los espacios
        expect(mockSetRestaurants).toHaveBeenCalledWith([
            {
                info: {
                    name: 'Pizza Palace',
                    avgRating: 4.8,
                    cuisines: ['Pizza', 'Italian']
                }
            }
        ]);
    });

    // Test 7: Verificar reset cuando la búsqueda está vacía
    it('should reset to all restaurants when search is empty', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Buscar con término vacío
        await user.type(searchInput, '   '); // Solo espacios
        await user.keyboard('{Enter}');
        
        // Verificar que se resetea a todos los restaurantes
        expect(mockSetRestaurants).toHaveBeenCalledWith(mockAllRestaurants);
    });

    // Test 8: Verificar que no encuentra resultados
    it('should return empty array when no restaurants match', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Buscar algo que no existe
        await user.type(searchInput, 'NonExistentRestaurant');
        await user.keyboard('{Enter}');
        
        // Verificar que se llama con array vacío
        expect(mockSetRestaurants).toHaveBeenCalledWith([]);
    });

    // Test 9: Verificar búsqueda parcial
    it('should find restaurants with partial matches', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Buscar solo parte del nombre
        await user.type(searchInput, 'Pizza');
        await user.keyboard('{Enter}');
        
        // Verificar que encuentra 'Pizza Palace'
        expect(mockSetRestaurants).toHaveBeenCalledWith([
            {
                info: {
                    name: 'Pizza Palace',
                    avgRating: 4.8,
                    cuisines: ['Pizza', 'Italian']
                }
            }
        ]);
    });

    // Test 10: Verificar que TopRatedRestaurants recibe las props correctas
    it('should pass correct props to TopRatedRestaurants', () => {
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const topRatedButton = screen.getByTestId('top-rated-button');
        
        // Verificar que el botón existe
        expect(topRatedButton).toBeInTheDocument();
        
        // Verificar que el texto es correcto
        expect(topRatedButton).toHaveTextContent('Top Rated Restaurants');
    });

    // Test 11: Verificar que el input tiene los atributos correctos
    it('should have correct input attributes', () => {
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Verificar atributos del input
        expect(searchInput).toHaveAttribute('type', 'text');
        expect(searchInput).toHaveAttribute('placeholder', 'Search for restaurants...');
    });

    // Test 12: Verificar que el botón tiene el emoji correcto
    it('should display search emoji in button', () => {
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchButton = screen.getByRole('button', { name: '🔎' });
        
        // Verificar que el botón contiene el emoji de búsqueda
        expect(searchButton).toHaveTextContent('🔎');
    });

    // Test 13: Verificar múltiples búsquedas consecutivas
    it('should handle multiple consecutive searches', async () => {
        const user = userEvent.setup();
        render(<SearchBar setRestaurants={mockSetRestaurants} allRestaurants={mockAllRestaurants} />);
        
        const searchInput = screen.getByPlaceholderText('Search for restaurants...');
        
        // Primera búsqueda
        await user.type(searchInput, 'Pizza');
        await user.keyboard('{Enter}');
        
        // Verificar primera búsqueda
        expect(mockSetRestaurants).toHaveBeenCalledWith([
            {
                info: {
                    name: 'Pizza Palace',
                    avgRating: 4.8,
                    cuisines: ['Pizza', 'Italian']
                }
            }
        ]);
        
        // Segunda búsqueda
        await user.type(searchInput, 'Burger');
        await user.keyboard('{Enter}');
        
        // Verificar segunda búsqueda
        expect(mockSetRestaurants).toHaveBeenCalledWith([
            {
                info: {
                    name: 'Burger House',
                    avgRating: 4.2,
                    cuisines: ['Burgers', 'Fast Food']
                }
            }
        ]);
        
        // Verificar que se llamó setRestaurants dos veces
        expect(mockSetRestaurants).toHaveBeenCalledTimes(2);
    });
});