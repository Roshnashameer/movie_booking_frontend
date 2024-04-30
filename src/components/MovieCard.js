import React from 'react'
import Card from 'react-bootstrap/Card';


function MovieCard({movie}) {
    return (
        <div > 
            
               
              
            <Card style={{ width: '20rem', height: '750px' }} className='rounded bg-white p-2 shadow flex flex-col gap-1' id='d'>
            <Card.Img variant="top" src={movie.movieImage} />
            <Card.Body>
                <Card.Title className='text-center'>{movie.title}</Card.Title>
                <Card.Text>
                    {movie.overView}
                </Card.Text>
        
            </Card.Body>
        </Card>
       
        </div>
    )
}

export default MovieCard