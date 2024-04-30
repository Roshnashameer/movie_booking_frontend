import React, { useEffect, useState } from 'react'
import { bookingViewApi } from '../service/allApis';
import { Button, Col, Row } from 'react-bootstrap';

function ViewMyBookings() {
    const [userBookings, setUserBookings] = useState([]);
    const getUserBookings = async () => {
        if (localStorage.getItem('currentId')) {
            const id = localStorage.getItem('currentId');
            //   console.log(id);
            const token = localStorage.getItem('token');
            // header creation
            const reqHeader = {
                "Content-Type": "application/json", // Corrected the typo
                "authorization": `Bearer ${token}`
            };

            // console.log(reqHeader);
            try {
                const result = await bookingViewApi(reqHeader, id)
                console.log(result);
                if (result.status === 200) {
                    setUserBookings(result.data)
                }
            }
            catch (err) {
                console.error("Error fetching user Bookings:", err);
            }
        }
    }
    console.log(userBookings);
    useEffect(() => {
        getUserBookings()
    }, [])
    return (
        <>
            {userBookings?.length > 0 ?
                userBookings?.map(i => (
                    <div className='border mt-3 p-4 shadow'>
                        <Row>
                            <Col lg={6}>
                                <p>{i?.movieName}</p>
                            </Col>
                            <Col lg={6} className='text-end'>


                                {i?.seatNumbers.map((seat, idx) => (
                                    <span key={idx}>
                                        <Button className='text-end px-3'>{seat} 
                                        </Button> </span>))}


                            </Col>
                        </Row>
                    </div>)) :
                <p className='text-primary mt-5 p-4'>No Bookings  !</p>
            }
        </>
    )
}

export default ViewMyBookings