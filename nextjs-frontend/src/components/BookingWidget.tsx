import React from "react";

const BookingWidget: React.FC = () => {
    return (
        <div>
            <h2>Book Your Slot</h2>
            <button onClick={() => alert("Booking confirmed!")}>Book Now</button>
        </div>
    );
};

export default BookingWidget;
