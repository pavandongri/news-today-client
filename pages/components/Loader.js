import React from 'react'

const Loader = () => {
    return (
        <div className='text-center pt-2 pb-2'>
            <div className="spinner-border text-dark text-center" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader