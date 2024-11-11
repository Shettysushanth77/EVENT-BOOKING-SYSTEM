import React, { useMemo, useState } from 'react';
import EventCard from './EventCard';

const ITEMS_PER_PAGE = 6;

const EventList = ({ events, category, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = category === 'All' || event.category === category;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, category, searchTerm]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const pageCount = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {pageCount > 1 && (
        <div className="flex justify-center mt-8">
          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === i + 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;