import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartIcon from '../CartIcon';
import { useCart } from '../../../context/CartContext';

// Mock the useCart hook
vi.mock('../../../context/CartContext', () => ({
  useCart: vi.fn()
}));

describe('CartIcon', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders with zero items in cart', () => {
    // Mock empty cart
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(0)
    });

    const { container } = render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );

    // Check if cart icon is rendered (should be an SVG)
    const cartIcon = container.querySelector('svg');
    expect(cartIcon).toBeDefined();
    
    // The count badge should not be displayed when cart is empty
    const countBadge = screen.queryByText('0');
    expect(countBadge).toBeNull();
  });

  it('renders with items in cart and displays correct count', () => {
    // Mock cart with 5 items
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(5)
    });

    render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );

    // Check if count badge is displayed with correct count
    const countBadge = screen.getByText('5');
    expect(countBadge).toBeDefined();
  });

  it('displays 99+ for large number of items', () => {
    // Mock cart with 100 items
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(100)
    });

    render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );
    
    // Check if count badge shows "99+" for large counts
    const countBadge = screen.getByText('99+');
    expect(countBadge).toBeDefined();
  });

  it('links to the cart page', () => {
    // Mock cart with 3 items
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(3)
    });

    render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );
    
    // Check if the icon is wrapped in a link to the cart page
    const cartLink = screen.getByRole('link');
    expect(cartLink.getAttribute('href')).toBe('/cart');
  });
});

// Mock the useCart hook
vi.mock('../../../context/CartContext', async () => {
  const actual = await vi.importActual('../../../context/CartContext');
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

describe('CartIcon', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders with zero items in cart', () => {
    // Mock empty cart
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(0)
    });

    render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );

    // Check if cart icon is rendered (should be an SVG)
    const cartIcon = document.querySelector('svg');
    expect(cartIcon).toBeInTheDocument();
    
    // The count badge should not be displayed when cart is empty
    const countBadge = screen.queryByText('0');
    expect(countBadge).not.toBeInTheDocument();
  });

  it('renders with items in cart and displays correct count', () => {
    // Mock cart with 5 items
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(5)
    });

    render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );

    // Check if cart icon is rendered
    const cartIcon = document.querySelector('svg');
    expect(cartIcon).toBeInTheDocument();
    
    // Check if count badge is displayed with correct count
    const countBadge = screen.getByText('5');
    expect(countBadge).toBeInTheDocument();
  });

  it('displays 99+ for large number of items', () => {
    // Mock cart with 100 items
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(100)
    });

    render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );
    
    // Check if count badge shows "99+" for large counts
    const countBadge = screen.getByText('99+');
    expect(countBadge).toBeInTheDocument();
  });

  it('links to the cart page', () => {
    // Mock cart with 3 items
    (useCart as any).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(3)
    });

    render(
      <BrowserRouter>
        <CartIcon />
      </BrowserRouter>
    );
    
    // Check if the icon is wrapped in a link to the cart page
    const cartLink = screen.getByRole('link');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});
