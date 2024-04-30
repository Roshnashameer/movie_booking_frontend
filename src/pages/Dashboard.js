import React, { useEffect, useState } from 'react'
import { Col,  Row } from 'react-bootstrap'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import ViewMyBookings from '../components/ViewMyBookings'

function Dashboard() {
    const [uname,setUname]=useState("")
    const navigate=useNavigate()
   
    useEffect(()=>{
        if(localStorage.getItem("currentUser")){
            setUname((JSON.parse(localStorage.getItem("currentUser"))).userName)
        }
        else{
            alert("Pls Login First")
            navigate("/login")
        }
    },[])
    return (
        <div className='bg-light'>
            <Header dashboard></Header>
            {/* dashboard={true} */}
            <Row>
                <Col lg={8}>
                    <div className='py-3 px-3 mx-2 my-5 shadow bg-white'>
                        <h3>Welcome <span className='text-primary'>{uname}</span></h3>
                        <ViewMyBookings></ViewMyBookings>

                    </div>
                </Col>
                <Col lg={4} className='d-flex justify-content-center align-items-center'>
                <img className='w-50 mt-5'
                        src="https://i.postimg.cc/QCbbHkjM/0-7901-png-free-download-clip-art-kid-watching-boy.png" alt="" srcset="" />
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard