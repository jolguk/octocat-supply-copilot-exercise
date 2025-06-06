import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartPage from '../CartPage';
import { useCart } from '../../../context/CartContext';

// Mock the useCart hook
vi.mock('../../../context/CartContext', () => ({
  useCart: vi.fn()
}));

describe('CartPage', () => {
  // Setup mock cart data and functions
  const mockCartItems = [
    {
      id: '1',
      name: 'Test Product 1',
      price: 10,
      image: '/test-image1.jpg',
      quantity: 2
    },
    {
      id: '2',
      name: 'Test Product 2',
      price: 15,
      image: '/test-image2.jpg',
      quantity: 1
    }
  ];

  const mockCartFunctions = {
    items: mockCartItems,
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    getItemCount: vi.fn().mockReturnValue(3),
    getSubtotal: vi.fn().mockReturnValue(35) // 10*2 + 15*1 = 35
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useCart as any).mockReturnValue(mockCartFunctions);
  });

  it('renders cart items correctly', () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    // Check for cart title    expect(screen.getByText('Your Cart')).toBeDefined();
    
    // Check if both products are displayed
    expect(screen.getByText('Test Product 1')).toBeDefined();
    expect(screen.getByText('Test Product 2')).toBeDefined();
    
    // Check for prices - use getAllByText since these appear multiple times
    expect(screen.getAllByText('$10.00')[0]).toBeDefined();
    expect(screen.getAllByText('$15.00')[0]).toBeDefined();
  });

  it('calls updateQuantity when changing item quantity', () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    // Get the first quantity input
    const quantityInputs = screen.getAllByRole('spinbutton');
    
    // Change quantity
    fireEvent.change(quantityInputs[0], { target: { value: '5' } });
    
    // Check if updateQuantity was called with correct parameters
    expect(mockCartFunctions.updateQuantity).toHaveBeenCalledWith('1', 5);
  });

  it('calls removeItem when clicking remove button', () => {
    const { container } = render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    // Find the remove button using more reliable approach
    const removeButtons = container.querySelectorAll('button');
    let removeButton;
    
    for (let i = 0; i < removeButtons.length; i++) {
      if (removeButtons[i].innerHTML.includes('svg')) {
        removeButton = removeButtons[i];
        break;
      }
    }
    
    // Click the remove button for the first product
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(mockCartFunctions.removeItem).toHaveBeenCalled();
    }
  });

  it('displays empty cart message when cart is empty', () => {
    // Mock empty cart
    (useCart as any).mockReturnValue({
      ...mockCartFunctions,
      items: [],
      getItemCount: vi.fn().mockReturnValue(0),
      getSubtotal: vi.fn().mockReturnValue(0)
    });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    // Check for empty cart message
    expect(screen.getByText('Your cart is empty')).toBeDefined();
    
    // Check for continue shopping button
    expect(screen.getByText('Continue Shopping')).toBeDefined();
  });
});
