import React from 'react';

const TrainSeatMap = ({ seats, selectedSeats, reservedSeats}) => {
  const isSeatSelected = (seatId) => {
   return selectedSeats.includes(Number(seatId))||selectedSeats.includes(seatId.toString());
   
  };

  const isSeatReserved = (seatId) => {
  
  
   return reservedSeats.includes(Number(seatId))||reservedSeats.includes(seatId.toString());
   

};


 
  return (
    <div className="train-seat-map">
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {row.map((seat) => (
            <div
              key={seat.id}
             
              className={`seat ${isSeatSelected(seat.id) || isSeatReserved(seat.id)?'': 'available-seat'}${isSeatSelected(seat.id) ? 'selected' : ''} ${isSeatReserved(seat.id) ? 'reserved' : ''}`}
             
            >
              {seat.number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TrainSeatMap;
