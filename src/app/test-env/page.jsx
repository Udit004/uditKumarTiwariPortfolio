'use client';

export default function TestEnvPage() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variable Test</h1>
      <div className="space-y-4">
        <div>
          <strong>API Key exists:</strong> {apiKey ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>API Key length:</strong> {apiKey?.length || 0}
        </div>
        <div>
          <strong>API Key preview:</strong> {apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found'}
        </div>
        <div>
          <strong>All environment variables with GEMINI:</strong>
          <pre className="bg-gray-100 p-2 mt-2 rounded">
            {JSON.stringify(
              Object.keys(process.env).filter(key => key.includes('GEMINI')),
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
