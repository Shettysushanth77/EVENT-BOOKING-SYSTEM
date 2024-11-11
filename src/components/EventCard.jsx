import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">{event.description}</p>
        <div className="flex justify-between items-center">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{event.category}</span>
          <span className="text-green-600 font-bold">${event.price}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">Available seats: {event.availableSeats}</span>
          <Link 
            to={`/event/${event.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;