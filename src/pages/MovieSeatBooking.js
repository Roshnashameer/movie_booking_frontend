import React, { useEffect, useState } from 'react';
import './MovieSeatBooking.css';
import { bookingApi, seatViewApi } from '../service/allApis';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieSeatBooking = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [uname, setUname] = useState("")
    const navigate = useNavigate()
    const { id } = useParams();


    const fetchReservedSeatsData = async () => {

        if (id) {
            const token = localStorage.getItem('token');
            // header creation
            const reqHeader = {
                "Content-Type": "application/json", // Corrected the typo
                "authorization": `Bearer ${token}`
            };

            try {
                const result = await seatViewApi(reqHeader, id)
                // console.log(result.data);
                if (result.status === 200) {
                    const flattenedSeats = result.data.flat();
                    setReservedSeats(flattenedSeats);

                }
            }
            catch (err) {
                console.error("Error fetching seats:", err);
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            setUname((JSON.parse(localStorage.getItem("currentUser"))).userName)
            fetchReservedSeatsData()
        }
        else {
            alert("Pls Login First")
            navigate("/login")
        }
    }, [])


    const handleSeatClick = (seatNumber) => {
        if (reservedSeats.includes(seatNumber)) {
            // Seat is already reserved
            return;
        }

        // Toggle seat selection
        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatNumber)
                ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
                : [...prevSelectedSeats, seatNumber]
        );
    };

    const handleConfirmSeats = async (e) => {
        e.preventDefault()
        // Move selected seats to reserved seats
        const token = localStorage.getItem('token');
        // header creation
        const reqHeader = {
            "Content-Type": "application/json", // Corrected the typo
            "authorization": `Bearer ${token}`
        };
        // Clear selected seats

        console.log(reqHeader);

        const seats = selectedSeats.map(seat => (seat))
        try {
            const result = await bookingApi(reqHeader, { "seatNum": seats }, id);

            if (result.status === 200) {
                toast.success(result.data.msg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // alert(result.data.msg);
                setReservedSeats((prevReservedSeats) => [
                    ...prevReservedSeats,
                    ...selectedSeats,
                ]);
                setSelectedSeats([]); // Clear selected seats
            } else {
                toast.info(`This user is already booked this movie`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // alert("This user is already booked this movie");
            }
        }
        catch (err) {
            console.error("Error fetching seats:", err);
        }

    };


    const renderSeats = () => {
        const rows = [10, 10, 15, 15, 20, 20]; // Number of seats per row

        const seats = [];
        let seatNumber = 1;

        for (let row = 0; row < rows.length; row++) {
            const rowSeats = [];
            for (let col = 1; col <= rows[row]; col++) {
                const seatId = seatNumber;
                const isReserved = reservedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                rowSeats.push(
                    <div
                        key={seatId}
                        className={`seat ${isReserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''
                            }`}
                        onClick={() => handleSeatClick(seatId)}
                    >
                        {seatNumber}
                    </div>
                );

                seatNumber++;
            }
            seats.push(<div key={row} className="seat-row">{rowSeats}</div>);
        }

        return seats;
    };
    //  console.log();
    return (
        <div className="movie-seat-booking">
            <h1 style={{color:'orange'}}> Book your seats....</h1>
            <div className="screen">Screen</div>
            <div className="seats-container">{renderSeats()}</div>
            <div className="selected-seats">
                
                {selectedSeats.map(seat => (
                    <span className="seat" key={seat}>{seat}</span>
                ))}
            </div>
            <button onClick={handleConfirmSeats} className="confirm-button">Confirm Seats</button>
            <ToastContainer />
        </div>
    );
};

export default MovieSeatBooking;
