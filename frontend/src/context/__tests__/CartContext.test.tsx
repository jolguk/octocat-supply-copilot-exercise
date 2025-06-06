import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart, CartItem } from '../CartContext';

describe('CartContext', () => {
  // Setup mock cart data
  const mockCartItems: CartItem[] = [
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

  // Wrap renderHook to provide CartProvider
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getSubtotal()).toBe(0);
  });

  it('adds items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockCartItems[0]);
    expect(result.current.getItemCount()).toBe(2); // quantity is 2
    expect(result.current.getSubtotal()).toBe(20); // 10 * 2
    
    act(() => {
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    expect(result.current.getItemCount()).toBe(3); // 2 + 1
    expect(result.current.getSubtotal()).toBe(35); // 20 + 15
  });

  it('adds existing item increases quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add item first time
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    
    // Add same item again
    act(() => {
      result.current.addItem({
        ...mockCartItems[0],
        quantity: 3
      });
    });
    
    // Should update quantity instead of adding new item
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(5); // 2 + 3
    expect(result.current.getItemCount()).toBe(5);
    expect(result.current.getSubtotal()).toBe(50); // 10 * 5
  });

  it('removes items from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Remove first item
    act(() => {
      result.current.removeItem('1');
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
    expect(result.current.getItemCount()).toBe(1);
    expect(result.current.getSubtotal()).toBe(15);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add item
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items[0].quantity).toBe(2);
    
    // Update quantity
    act(() => {
      result.current.updateQuantity('1', 5);
    });
    
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getItemCount()).toBe(5);
    expect(result.current.getSubtotal()).toBe(50); // 10 * 5
  });

  it('removes item when quantity updated to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Update quantity to 0
    act(() => {
      result.current.updateQuantity('1', 0);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
  });

  it('clears the entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Clear cart
    act(() => {
      result.current.clearCart();
    });
    
    expect(result.current.items).toHaveLength(0);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getSubtotal()).toBe(0);
  });

  it('throws error when useCart is used outside of CartProvider', () => {
    // Mock console.error to prevent error logs during test
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});

describe('CartContext', () => {
  // Setup mock cart data
  const mockCartItems: CartItem[] = [
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

  // Wrap renderHook to provide CartProvider
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getSubtotal()).toBe(0);
  });

  it('adds items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockCartItems[0]);
    expect(result.current.getItemCount()).toBe(2); // quantity is 2
    expect(result.current.getSubtotal()).toBe(20); // 10 * 2
    
    act(() => {
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    expect(result.current.getItemCount()).toBe(3); // 2 + 1
    expect(result.current.getSubtotal()).toBe(35); // 20 + 15
  });

  it('adds existing item increases quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add item first time
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    
    // Add same item again
    act(() => {
      result.current.addItem({
        ...mockCartItems[0],
        quantity: 3
      });
    });
    
    // Should update quantity instead of adding new item
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(5); // 2 + 3
    expect(result.current.getItemCount()).toBe(5);
    expect(result.current.getSubtotal()).toBe(50); // 10 * 5
  });

  it('removes items from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Remove first item
    act(() => {
      result.current.removeItem('1');
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
    expect(result.current.getItemCount()).toBe(1);
    expect(result.current.getSubtotal()).toBe(15);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add item
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items[0].quantity).toBe(2);
    
    // Update quantity
    act(() => {
      result.current.updateQuantity('1', 5);
    });
    
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getItemCount()).toBe(5);
    expect(result.current.getSubtotal()).toBe(50); // 10 * 5
  });

  it('removes item when quantity updated to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Update quantity to 0
    act(() => {
      result.current.updateQuantity('1', 0);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
  });

  it('clears the entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Clear cart
    act(() => {
      result.current.clearCart();
    });
    
    expect(result.current.items).toHaveLength(0);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getSubtotal()).toBe(0);
  });

  it('integrates with React components correctly', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Initially empty cart
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.getByTestId('subtotal').textContent).toBe('0');
    
    // Add a new item
    fireEvent.click(screen.getByTestId('add-new-item'));
    
    // Check updated state
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    expect(screen.getByTestId('subtotal').textContent).toBe('25');
    expect(screen.getByTestId('item-3')).toBeDefined();
    
    // Increase quantity
    fireEvent.click(screen.getByTestId('increase-3'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('2');
    expect(screen.getByTestId('subtotal').textContent).toBe('50');
    
    // Decrease quantity
    fireEvent.click(screen.getByTestId('decrease-3'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    expect(screen.getByTestId('subtotal').textContent).toBe('25');
    
    // Remove item
    fireEvent.click(screen.getByTestId('remove-3'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.getByTestId('subtotal').textContent).toBe('0');
    expect(screen.queryByTestId('item-3')).toBeNull();
  });

  it('throws error when useCart is used outside of CartProvider', () => {
    // Mock console.error to prevent error logs during test
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});

// Helper component to test the CartContext
const TestComponent = () => {
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getItemCount, 
    getSubtotal 
  } = useCart();

  return (
    <div>
      <div data-testid="item-count">{getItemCount()}</div>
      <div data-testid="subtotal">{getSubtotal()}</div>
      <ul>
        {items.map((item) => (
          <li key={item.id} data-testid={`item-${item.id}`}>
            {item.name} - ${item.price} x {item.quantity}
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              data-testid={`increase-${item.id}`}
            >
              +
            </button>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              data-testid={`decrease-${item.id}`}
            >
              -
            </button>
            <button 
              onClick={() => removeItem(item.id)}
              data-testid={`remove-${item.id}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => addItem({
          id: '3',
          name: 'New Product',
          price: 25,
          image: '/new-image.jpg',
          quantity: 1
        })}
        data-testid="add-new-item"
      >
        Add New Item
      </button>
      <button 
        onClick={clearCart}
        data-testid="clear-cart"
      >
        Clear Cart
      </button>
    </div>
  );
};

describe('CartContext', () => {
  // Setup mock cart data
  const mockCartItems: CartItem[] = [
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

  // Wrap renderHook to provide CartProvider
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getSubtotal()).toBe(0);
  });

  it('adds items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockCartItems[0]);
    expect(result.current.getItemCount()).toBe(2); // quantity is 2
    expect(result.current.getSubtotal()).toBe(20); // 10 * 2
    
    act(() => {
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    expect(result.current.getItemCount()).toBe(3); // 2 + 1
    expect(result.current.getSubtotal()).toBe(35); // 20 + 15
  });

  it('adds existing item increases quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add item first time
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    
    // Add same item again
    act(() => {
      result.current.addItem({
        ...mockCartItems[0],
        quantity: 3
      });
    });
    
    // Should update quantity instead of adding new item
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(5); // 2 + 3
    expect(result.current.getItemCount()).toBe(5);
    expect(result.current.getSubtotal()).toBe(50); // 10 * 5
  });

  it('removes items from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Remove first item
    act(() => {
      result.current.removeItem('1');
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
    expect(result.current.getItemCount()).toBe(1);
    expect(result.current.getSubtotal()).toBe(15);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add item
    act(() => {
      result.current.addItem(mockCartItems[0]);
    });
    
    expect(result.current.items[0].quantity).toBe(2);
    
    // Update quantity
    act(() => {
      result.current.updateQuantity('1', 5);
    });
    
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getItemCount()).toBe(5);
    expect(result.current.getSubtotal()).toBe(50); // 10 * 5
  });

  it('removes item when quantity updated to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Update quantity to 0
    act(() => {
      result.current.updateQuantity('1', 0);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
  });

  it('clears the entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Add items
    act(() => {
      result.current.addItem(mockCartItems[0]);
      result.current.addItem(mockCartItems[1]);
    });
    
    expect(result.current.items).toHaveLength(2);
    
    // Clear cart
    act(() => {
      result.current.clearCart();
    });
    
    expect(result.current.items).toHaveLength(0);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getSubtotal()).toBe(0);
  });

  it('integrates with React components correctly', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Initially empty cart
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.getByTestId('subtotal').textContent).toBe('0');
    
    // Add a new item
    fireEvent.click(screen.getByTestId('add-new-item'));
    
    // Check updated state
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    expect(screen.getByTestId('subtotal').textContent).toBe('25');
    expect(screen.getByTestId('item-3')).toBeInTheDocument();
    
    // Increase quantity
    fireEvent.click(screen.getByTestId('increase-3'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('2');
    expect(screen.getByTestId('subtotal').textContent).toBe('50');
    
    // Decrease quantity
    fireEvent.click(screen.getByTestId('decrease-3'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    expect(screen.getByTestId('subtotal').textContent).toBe('25');
    
    // Remove item
    fireEvent.click(screen.getByTestId('remove-3'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.getByTestId('subtotal').textContent).toBe('0');
    expect(screen.queryByTestId('item-3')).not.toBeInTheDocument();
    
    // Add item again
    fireEvent.click(screen.getByTestId('add-new-item'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    
    // Clear cart
    fireEvent.click(screen.getByTestId('clear-cart'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.queryByTestId('item-3')).not.toBeInTheDocument();
  });

  it('throws error when useCart is used outside of CartProvider', () => {
    // Mock console.error to prevent error logs during test
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});
