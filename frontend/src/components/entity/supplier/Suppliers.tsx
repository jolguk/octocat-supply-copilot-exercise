import { useState } from 'react';
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

const fetchSuppliers = async (): Promise<Supplier[]> => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Fetching suppliers from: ${api.baseURL}${api.endpoints.suppliers}`);
    if (import.meta.env.DEV) {
      console.log('Suppliers API response:', response);
    }
    const response = await axios.get(`${api.baseURL}${api.endpoints.suppliers}`);
    console.log('Suppliers API response:', response);
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching suppliers:", error);
      if (axios.isAxiosError(error)) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        status: error.response?.status
      });
    }
      // In production, log only a generic error message
      console.error("Error fetching suppliers.");
    }
    throw error;
    }
    throw error;
  }
};

export default function Suppliers() {
  const { data: suppliers, isLoading, error, refetch } = useQuery('suppliers', fetchSuppliers, {
    onError: (err) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Query error in Suppliers component:', err);
      }
      // Optionally, integrate a logging utility here for production
    }
  });
  
const SUPPLIERS_QUERY_KEY = 'suppliers';

export default function Suppliers() {
  const { data: suppliers, isLoading, error, refetch } = useQuery(SUPPLIERS_QUERY_KEY, fetchSuppliers, {
    onError: (err) => {
      console.error('Query error in Suppliers component:', err);
    }
  });
  
  if (isLoading) {
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-24 mx-auto max-w-4xl">
        <p>Error loading suppliers. Please try again later.</p>
        <button 
          onClick={() => refetch()} 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold text-primary mb-8">Our Suppliers</h1>
          <div key={supplier.supplierId} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-primary mb-2">{supplier.name}</h2>
            <p className="text-gray-300 mb-4">{supplier.description}</p>
          <div key={supplier.supplierId} className="bg-dark-light rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
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
  );
}
