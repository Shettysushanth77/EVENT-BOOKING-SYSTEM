import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { events } from '../data/mockData';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const event = events.find(e => e.id === parseInt(id));

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (event.availableSeats > 0) {
      event.availableSeats -= 1;
      alert('Ticket booked successfully!');
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={event.image} alt={event.title} className="w-full h-96 object-cover rounded-lg" />
      <div className="mt-8">
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p className="text-gray-600 mt-4">{event.description}</p>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Date</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Category</h3>
            <p>{event.category}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Available Seats</h3>
            <p>{event.availableSeats}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Price</h3>
            <p>${event.price}</p>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={event.availableSeats === 0}
          className={`mt-8 px-6 py-3 rounded-lg text-white ${
            event.availableSeats === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {event.availableSeats === 0 ? 'Fully Booked' : 'Book Ticket'}
        </button>
      </div>
    </div>
  );
};

export default EventDetails;