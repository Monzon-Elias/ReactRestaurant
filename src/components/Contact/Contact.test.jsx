import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact', () => {
    test('should render contact component', () => {
        render(<Contact />);
        const contactElement = screen.getByText(/Contact/i);
        expect(contactElement).toBeInTheDocument();
    });
    
    test('should render a submit button', () => {
        render(<Contact />);
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).toBeInTheDocument();
    });
    
    test('should render a contact form', () => {
        render(<Contact />);
        // Buscar el formulario a través del texto del heading y subir al form
        const contactForm = screen.getByText('Send Message').closest('form');
        expect(contactForm).toBeInTheDocument();
    });
});