import React from 'react';

export default function TestPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Test Page</h1>
      <p className="mt-4">This is a test page to check if the site loads correctly.</p>
      
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg">
          <h2 className="font-bold">Python</h2>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h2 className="font-bold">JavaScript</h2>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h2 className="font-bold">React</h2>
        </div>
      </div>
    </div>
  );
}
