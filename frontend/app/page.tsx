'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

interface ApiResponse {
  message: string;
  status: string;
  version: string;
  time?: string;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/test')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to connect to Laravel API');
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Laravel 13 + Next.js 16
        </h1>

        <div className="bg-gray-100 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">API Response from Laravel:</h2>
          
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading from Laravel API...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : (
            <pre className="bg-black text-green-400 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Backend: http://localhost:8000 • Frontend: http://localhost:3000
        </p>
      </div>
    </main>
  );
}
