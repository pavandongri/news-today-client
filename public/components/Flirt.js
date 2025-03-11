import React from 'react'

const Flirt = () => {
    const flirt = "Hey, You are learning something great today... "
    return (
        <div className='flirt'>
            <p>{flirt}  Please <span style={{ color: 'red', fontWeight: 'bold', borderBottom: '3px solid black' }}> explore</span> this page more ... !</p>
        </div>
    )
}

export default Flirt