import axios from 'axios';
import { useQuery } from 'react-query';
import { api } from '../../../api/config';

interface Supplier {
  supplierId: number;
  name: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
}

const SUPPLIERS_QUERY_KEY = 'suppliers';

const fetchSuppliers = async (): Promise<Supplier[]> => {
  try {
    console.log(`Fetching suppliers from: ${api.baseURL}${api.endpoints.suppliers}`);
    const response = await axios.get(`${api.baseURL}${api.endpoints.suppliers}`);
    console.log('Suppliers API response:', response);
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
    }
    throw error;
  }
};

export default function Suppliers() {
  const { data: suppliers, isLoading, error, refetch } = useQuery(SUPPLIERS_QUERY_KEY, fetchSuppliers, {
    onError: (err) => {
      console.error('Query error in Suppliers component:', err);
    }
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading suppliers. Please try again later.</p>
            <button 
              onClick={() => refetch()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-8">Our Suppliers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers?.map((supplier) => (
            <div key={supplier.supplierId} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-primary mb-2">{supplier.name}</h2>
              <p className="text-gray-300 mb-4">{supplier.description}</p>
              
              <div className="space-y-2 text-gray-200">
                <div className="flex items-start">
                  <span className="text-primary mr-2">Contact:</span> 
                  <span>{supplier.contactPerson}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="text-primary mr-2">Email:</span> 
                  <a href={`mailto:${supplier.email}`} className="text-blue-400 hover:underline">
                    {supplier.email}
                  </a>
                </div>
                
                <div className="flex items-start">
                  <span className="text-primary mr-2">Phone:</span> 
                  <a href={`tel:${supplier.phone}`} className="hover:underline">
                    {supplier.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
