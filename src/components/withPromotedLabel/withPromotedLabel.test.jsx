import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import withPromotedLabel from './withPromotedLabel';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

// Mock del componente RestaurantCard para testing
const MockRestaurantCard = ({ restaurant, extraProp }) => (
    <div data-testid="restaurant-card">
        <h2>{restaurant.info.name}</h2>
        <p>{restaurant.info.cuisines.join(', ')}</p>
        {extraProp && <p>{extraProp}</p>}
    </div>
);

describe('withPromotedLabel', () => {
    // Test 1: Verificar que el HOC retorna una función
    it('should return a function', () => {
        const PromotedRestaurantCard = withPromotedLabel(MockRestaurantCard);
        expect(typeof PromotedRestaurantCard).toBe('function');
    });

    // Test 2: Verificar que se renderiza correctamente
    it('should render the promoted label and wrapped component', () => {
        const PromotedRestaurantCard = withPromotedLabel(MockRestaurantCard);
        const mockRestaurant = {
            info: {
                name: 'Test Restaurant',
                cuisines: ['Italian', 'Pizza'],
                avgRating: 4.5,
                cloudinaryImageId: 'test-image',
                costForTwo: '₹500',
                sla: { slaString: '30-35 min' }
            }
        };

        render(<PromotedRestaurantCard restaurant={mockRestaurant} />);
        
        // Verificar que se renderiza el label promocional
        expect(screen.getByText('Promoted Restaurant')).toBeInTheDocument();
        
        // Verificar que se renderiza el componente envuelto
        expect(screen.getByTestId('restaurant-card')).toBeInTheDocument();
        expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    });

    // Test 3: Verificar que las props se pasan correctamente
    it('should pass props correctly to the wrapped component', () => {
        const PromotedRestaurantCard = withPromotedLabel(MockRestaurantCard);
        const mockRestaurant = {
            info: {
                name: 'Pizza Palace',
                cuisines: ['Pizza', 'Italian'],
                avgRating: 4.2,
                cloudinaryImageId: 'pizza-image',
                costForTwo: '₹600',
                sla: { slaString: '25-30 min' }
            }
        };

        render(<PromotedRestaurantCard restaurant={mockRestaurant} />);
        
        // Verificar que las props se pasan correctamente
        expect(screen.getByText('Pizza Palace')).toBeInTheDocument();
        expect(screen.getByText('Pizza, Italian')).toBeInTheDocument();
    });

    // Test 4: Verificar la estructura HTML
    it('should have correct HTML structure', () => {
        const PromotedRestaurantCard = withPromotedLabel(MockRestaurantCard);
        const mockRestaurant = {
            info: {
                name: 'Test Restaurant',
                cuisines: ['Test'],
                avgRating: 4.0,
                cloudinaryImageId: 'test',
                costForTwo: '₹400',
                sla: { slaString: '20 min' }
            }
        };

        const { container } = render(<PromotedRestaurantCard restaurant={mockRestaurant} />);
        
        // Verificar que existe el contenedor con la clase correcta
        const wrapper = container.querySelector('.with-promoted-label');
        expect(wrapper).toBeInTheDocument();
        
        // Verificar que existe el label
        const label = wrapper.querySelector('label');
        expect(label).toBeInTheDocument();
        expect(label.textContent).toBe('Promoted Restaurant');
        
        // Verificar que existe el componente envuelto
        const restaurantCard = wrapper.querySelector('[data-testid="restaurant-card"]');
        expect(restaurantCard).toBeInTheDocument();
    });

    // Test 5: Verificar que funciona con el RestaurantCard real
    it('should work with the actual RestaurantCard component', () => {
        const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);
        const mockRestaurant = {
            info: {
                name: 'Real Restaurant',
                cuisines: ['Mexican', 'Tacos'],
                avgRating: 4.8,
                cloudinaryImageId: 'real-image',
                costForTwo: '₹800',
                sla: { slaString: '35-40 min' }
            }
        };

        render(<PromotedRestaurantCard restaurant={mockRestaurant} />);
        
        // Verificar que se renderiza el label promocional
        expect(screen.getByText('Promoted Restaurant')).toBeInTheDocument();
        
        // Verificar que se renderiza el restaurante real
        expect(screen.getByText('Real Restaurant')).toBeInTheDocument();
        expect(screen.getByText('Mexican, Tacos')).toBeInTheDocument();
        expect(screen.getByText('4.8')).toBeInTheDocument();
    });

    // Test 6: Verificar que no modifica las props originales
    it('should not modify the original props', () => {
        const PromotedRestaurantCard = withPromotedLabel(MockRestaurantCard);
        const originalProps = {
            restaurant: {
                info: {
                    name: 'Original Restaurant',
                    cuisines: ['Original'],
                    avgRating: 4.0,
                    cloudinaryImageId: 'original',
                    costForTwo: '₹400',
                    sla: { slaString: '20 min' }
                }
            },
            extraProp: 'should be preserved'
        };

        render(<PromotedRestaurantCard {...originalProps} />);
        
        // Verificar que las props originales se mantienen
        expect(screen.getByText('Original Restaurant')).toBeInTheDocument();
        expect(screen.getByText('Original')).toBeInTheDocument();
        expect(screen.getByText('should be preserved')).toBeInTheDocument();
    });

    // Test 7: Verificar que el HOC es reutilizable
    it('should be reusable with different components', () => {
        const MockComponent = ({ title }) => <div data-testid="mock-component">{title}</div>;
        const PromotedMockComponent = withPromotedLabel(MockComponent);

        render(<PromotedMockComponent title="Test Title" />);
        
        // Verificar que funciona con cualquier componente
        expect(screen.getByText('Promoted Restaurant')).toBeInTheDocument();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByTestId('mock-component')).toBeInTheDocument();
    });
});