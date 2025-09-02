import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Cart from './Cart'
import cartReducer from '../../utils/cartSlice'

// Crear un store de prueba
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        items: initialState.items || []
      }
    }
  })
}

// Wrapper para renderizar componentes con Redux
const renderWithRedux = (component, initialState = {}) => {
  const store = createTestStore(initialState)
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store
  }
}

describe('Cart Component', () => {
  test('muestra mensaje de carrito vacío cuando no hay items', () => {
    renderWithRedux(<Cart />)
    
    expect(screen.getByText('🛒 Tu carrito está vacío')).toBeInTheDocument()
    expect(screen.getByText('¡Agrega algunos platos deliciosos!')).toBeInTheDocument()
  })

  test('muestra items del carrito correctamente', () => {
    const mockItems = [
      {
        card: {
          info: {
            id: '1',
            name: 'Pizza Margherita',
            description: 'Pizza tradicional italiana',
            price: 1200,
            imageId: 'test-image'
          }
        },
        quantity: 2
      }
    ]

    renderWithRedux(<Cart />, { items: mockItems })
    
    expect(screen.getByText('🛒 Tu Carrito')).toBeInTheDocument()
    expect(screen.getByText('Pizza Margherita')).toBeInTheDocument()
    expect(screen.getByText('Pizza tradicional italiana')).toBeInTheDocument()
    expect(screen.getByText('₹12 por unidad')).toBeInTheDocument()
    expect(screen.getByText('Total: ₹24')).toBeInTheDocument()
  })

  test('calcula el total correctamente', () => {
    const mockItems = [
      {
        card: {
          info: {
            id: '1',
            name: 'Pizza',
            price: 1000
          }
        },
        quantity: 2
      },
      {
        card: {
          info: {
            id: '2',
            name: 'Pasta',
            price: 800
          }
        },
        quantity: 1
      }
    ]

    renderWithRedux(<Cart />, { items: mockItems })
    
    // Total: (1000 * 2) + (800 * 1) = 2800 / 100 = ₹28.00
    expect(screen.getByText('Total del Carrito: ₹28.00')).toBeInTheDocument()
    expect(screen.getByText('3 Items')).toBeInTheDocument()
  })

  test('incrementa cantidad al hacer clic en +', () => {
    const mockItems = [
      {
        card: {
          info: {
            id: '1',
            name: 'Pizza',
            price: 1000
          }
        },
        quantity: 1
      }
    ]

    const { store } = renderWithRedux(<Cart />, { items: mockItems })
    
    const incrementButton = screen.getByText('+')
    fireEvent.click(incrementButton)
    
    // Verificar que la cantidad se incrementó en el store
    const state = store.getState()
    expect(state.cart.items[0].quantity).toBe(2)
  })

  test('decrementa cantidad al hacer clic en -', () => {
    const mockItems = [
      {
        card: {
          info: {
            id: '1',
            name: 'Pizza',
            price: 1000
          }
        },
        quantity: 2
      }
    ]

    const { store } = renderWithRedux(<Cart />, { items: mockItems })
    
    const decrementButton = screen.getByText('-')
    fireEvent.click(decrementButton)
    
    // Verificar que la cantidad se decrementó en el store
    const state = store.getState()
    expect(state.cart.items[0].quantity).toBe(1)
  })

  test('muestra botón de eliminar cuando quantity es 1', () => {
    const mockItems = [
      {
        card: {
          info: {
            id: '1',
            name: 'Pizza',
            price: 1000
          }
        },
        quantity: 1
      }
    ]

    renderWithRedux(<Cart />, { items: mockItems })
    
    expect(screen.getByText('🗑️')).toBeInTheDocument()
    expect(screen.queryByText('-')).not.toBeInTheDocument()
  })
})
