import React from 'react'

const Heading = ({ title = '', viewMore = false }) => {
    return (
        <>
            <div className='heading'>
                <div className='heading-title'>
                    <p style={{ textTransform: 'capitalize', margin: 'auto' }}>{title}</p>
                </div>

                {
                    viewMore &&
                    <div style={{ display: 'flex' }}>
                        <a href={`/${title}`} className='heading-view-more'>See More <span>&gt;</span> </a>
                    </div>
                }
            </div>
        </>
    )
}

export default Heading