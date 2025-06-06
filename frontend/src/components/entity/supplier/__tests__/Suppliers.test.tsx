import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suppliers } from '../Suppliers';

// Mock axios
vi.mock('axios');

// Mock React Query to avoid loading state
vi.mock('react-query', async () => {
  const actual = await vi.importActual('react-query');
  return {
    ...actual,
    useQuery: vi.fn()
  };
});

describe('Suppliers Component', () => {
  const mockSuppliers = [
    {
      supplierId: 1,
      name: 'Tech Components Ltd',
      description: 'High-quality electronic components',
      contactPerson: 'Jane Doe',
      email: 'jane@techcomponents.com',
      phone: '555-123-4567'
    },
    {
      supplierId: 2,
      name: 'Global Distributors',
      description: 'Worldwide logistics and supply',
      contactPerson: 'John Smith',
      email: 'john@globaldist.com',
      phone: '555-987-6543'
    }
  ];

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('displays loading state initially', () => {
    // Set up the loading state
    const { useQuery } = require('react-query');
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suppliers />
      </QueryClientProvider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays suppliers after loading', () => {
    // Mock a successful query result
    const { useQuery } = require('react-query');
    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockSuppliers
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suppliers />
      </QueryClientProvider>
    );

    // Check for supplier data
    expect(screen.getByText('Tech Components Ltd')).toBeInTheDocument();
    expect(screen.getByText('Global Distributors')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('john@globaldist.com')).toBeInTheDocument();
  });

  it('displays error message when API call fails', () => {
    // Mock an error state
    const { useQuery } = require('react-query');
    useQuery.mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch suppliers'),
      data: null
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suppliers />
      </QueryClientProvider>
    );

    // Check for error message
    expect(screen.getByText(/Error loading suppliers/i)).toBeInTheDocument();
  });
});
