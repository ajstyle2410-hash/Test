'use client';

import React, { useRef } from 'react';
import { ServiceDTO } from '@/app/core/services/service.service';

interface Props {
  services: ServiceDTO[];
  onRequest?: (service: ServiceDTO) => void;
}

export default function ServiceSlider({ services = [], onRequest }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(offset: number) {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <button
        aria-label="scroll-left"
        onClick={() => scrollBy(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow hover:bg-gray-100"
      >
        ◀
      </button>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-4 px-6 no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {services.map((s) => (
          <div key={s.id} className="min-w-[260px] bg-white rounded-lg shadow p-4 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-2">{s.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{s.description}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => onRequest && onRequest(s)}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Request
              </button>
              <a href={`/projects?service=${s.id}`} className="text-xs text-gray-500 hover:underline">Learn more</a>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="scroll-right"
        onClick={() => scrollBy(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow hover:bg-gray-100"
      >
        ▶
      </button>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
