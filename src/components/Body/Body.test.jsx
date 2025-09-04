import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Body from './Body';

// Mock del hook useOnlineStatus
vi.mock('../../hooks/useOnlineStatus', () => ({
    default: vi.fn(() => true) // Por defecto retorna true (online)
}));

// Mock del componente SearchBar
vi.mock('../SearchBar/SearchBar', () => ({
    default: function MockSearchBar({ setRestaurants, allRestaurants }) {
        return (
            <div data-testid="search-bar">
                <p>SearchBar Component</p>
                <p>All Restaurants: {allRestaurants.length}</p>
            </div>
        );
    }
}));

// Mock del componente RestaurantList
vi.mock('../RestaurantList/RestaurantList', () => ({
    default: function MockRestaurantList({ restaurants }) {
        return (
            <div data-testid="restaurant-list">
                <p>RestaurantList Component</p>
                <p>Restaurants Count: {restaurants.length}</p>
            </div>
        );
    }
}));

// Mock del componente Offline
vi.mock('../../Snippets/Offline', () => ({
    default: function MockOffline() {
        return (
            <div data-testid="offline-component">
                <h2>¡Ups! Parece que estás offline</h2>
                <p>No podemos cargar los restaurantes en este momento.</p>
            </div>
        );
    }
}));

describe('Body', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Test 1: Verificar que se renderiza correctamente cuando está online
    it('should render Body component when online', () => {
        render(<Body />);
        
        // Verificar que se renderiza el contenedor principal
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByTestId('restaurant-list')).toBeInTheDocument();
        
        // Verificar que NO se renderiza el componente offline
        expect(screen.queryByTestId('offline-component')).not.toBeInTheDocument();
    });

    // Test 2: Verificar que SearchBar recibe las props correctas
    it('should pass correct props to SearchBar', () => {
        render(<Body />);
        
        // Verificar que SearchBar se renderiza con el texto correcto
        expect(screen.getByText('SearchBar Component')).toBeInTheDocument();
        expect(screen.getByText('All Restaurants: 0')).toBeInTheDocument();
    });

    // Test 3: Verificar que RestaurantList recibe las props correctas
    it('should pass correct props to RestaurantList', () => {
        render(<Body />);
        
        // Verificar que RestaurantList se renderiza con el texto correcto
        expect(screen.getByText('RestaurantList Component')).toBeInTheDocument();
        expect(screen.getByText('Restaurants Count: 0')).toBeInTheDocument();
    });

    // Test 4: Verificar que el estado inicial es correcto
    it('should have correct initial state', () => {
        render(<Body />);
        
        // Verificar que inicialmente no hay restaurantes
        expect(screen.getByText('All Restaurants: 0')).toBeInTheDocument();
        expect(screen.getByText('Restaurants Count: 0')).toBeInTheDocument();
    });

    // Test 5: Verificar la estructura del DOM
    it('should have correct DOM structure', () => {
        const { container } = render(<Body />);
        
        // Verificar que existe el contenedor principal con la clase correcta
        const bodyContainer = container.querySelector('.body');
        expect(bodyContainer).toBeInTheDocument();
        
        // Verificar que contiene los componentes esperados
        expect(bodyContainer).toContainElement(screen.getByTestId('search-bar'));
        expect(bodyContainer).toContainElement(screen.getByTestId('restaurant-list'));
    });

    // Test 6: Verificar que el componente no tiene props
    it('should not require any props', () => {
        // Debería renderizar sin props
        expect(() => render(<Body />)).not.toThrow();
    });

    // Test 7: Verificar que el componente es un componente funcional
    it('should be a functional component', () => {
        const { container } = render(<Body />);
        
        // Verificar que se renderiza como un div
        expect(container.firstChild).toHaveClass('body');
    });

    // Test 8: Verificar que los mocks funcionan correctamente
    it('should work with mocked components', () => {
        render(<Body />);
        
        // Verificar que los componentes mock se renderizan correctamente
        expect(screen.getByText('SearchBar Component')).toBeInTheDocument();
        expect(screen.getByText('RestaurantList Component')).toBeInTheDocument();
    });
});