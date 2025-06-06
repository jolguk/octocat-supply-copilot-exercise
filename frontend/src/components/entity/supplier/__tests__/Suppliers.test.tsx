import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Suppliers from '../Suppliers';

// Mock axios
vi.mock('axios');

// Mock React Query
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
  });  it('displays loading state initially', () => {
    // Set up the loading state
    const useQueryMock = vi.fn().mockReturnValue({
      isLoading: true,
      error: null,
      data: null
    });
    
    // Import and assign the mock
    const reactQuery = require('react-query');
    reactQuery.useQuery = useQueryMock;

    render(
      <QueryClientProvider client={queryClient}>
        <Suppliers />
      </QueryClientProvider>
    );

    // Look for the loading spinner
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });
  it('displays suppliers after loading', () => {
    // Mock a successful query result
    const useQueryMock = vi.fn().mockReturnValue({
      isLoading: false,
      error: null,
      data: mockSuppliers
    });
    
    // Import and assign the mock
    const reactQuery = require('react-query');
    reactQuery.useQuery = useQueryMock;

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
  });  it('displays error message when API call fails', () => {
    // Mock an error state
    const useQueryMock = vi.fn().mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch suppliers'),
      data: null
    });
    
    // Import and assign the mock
    const reactQuery = require('react-query');
    reactQuery.useQuery = useQueryMock;

    render(
      <QueryClientProvider client={queryClient}>
        <Suppliers />
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Error loading suppliers. Please try again later.')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
});
