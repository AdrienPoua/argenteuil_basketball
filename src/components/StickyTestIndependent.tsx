'use client';
import React from 'react';

export default function StickyTestIndependent() {
  return (
    <div className='py-10'>
      <h1 className='mb-10 text-center text-3xl font-bold'>Tests d&apos;Effet Sticky</h1>

      {/* Test 1: Approche HTML/CSS pure */}
      <div className='mb-20'>
        <h2 className='mb-4 text-center text-xl font-bold'>Test 1: CSS Pur</h2>
        <div
          style={{
            height: '500px',
            overflow: 'auto',
            border: '2px solid blue',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '1000px',
              backgroundImage: 'linear-gradient(180deg, #e0f7fa 0%, #80deea 100%)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: '10px',
                padding: '20px',
                backgroundColor: 'rgba(0, 150, 136, 0.8)',
                color: 'white',
                borderRadius: '8px',
                margin: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Élément Sticky (CSS Pur)</h3>
              <p>Cet élément utilise position: sticky avec des styles inline purs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test 2: Approche Tailwind */}
      <div className='mb-20'>
        <h2 className='mb-4 text-center text-xl font-bold'>Test 2: Tailwind</h2>
        <div className='relative h-[500px] overflow-auto border-2 border-purple-500'>
          <div className='relative h-[1000px] bg-gradient-to-b from-purple-100 to-purple-300'>
            <div className='sticky top-5 m-5 rounded-lg bg-purple-600 bg-opacity-80 p-5 text-white shadow-md'>
              <h3 className='mb-2 font-bold'>Élément Sticky (Tailwind)</h3>
              <p>Cet élément utilise la classe Tailwind sticky</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test 3: Approche mixte */}
      <div className='mb-20'>
        <h2 className='mb-4 text-center text-xl font-bold'>Test 3: Approche Mixte</h2>
        <div className='relative h-[500px] overflow-auto border-2 border-amber-500'>
          <div className='relative h-[1000px] bg-gradient-to-b from-amber-100 to-amber-300'>
            <div
              className='m-5 rounded-lg bg-amber-600 bg-opacity-80 p-5 text-white shadow-md'
              style={{ position: 'sticky', top: '20px' }}
            >
              <h3 className='mb-2 font-bold'>Élément Sticky (Mixte)</h3>
              <p>Cet élément combine Tailwind et styles inline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
