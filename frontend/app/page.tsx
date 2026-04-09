'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/test')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Laravel 13 + Next.js 16
        </h1>

        <div className="bg-gray-100 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">API Response:</h2>
          
          {loading ? (
            <p className="text-center text-gray-500">Loading from Laravel API...</p>
          ) : (
            <pre className="bg-black text-green-400 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Backend running on port 8000 • Frontend on port 3000
        </p>
      </div>
    </main>
  );
}
