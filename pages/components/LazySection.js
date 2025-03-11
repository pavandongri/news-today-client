import React, { useState, useEffect } from 'react';
import Section from './Section';
import { useInView } from 'react-intersection-observer';

const LazySection = ({ categoryName = '' }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '0px',
        threshold: 0,
    });

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (inView) {
            setShow(true);
            console.log({ categoryName: `${categoryName} - in view` });
        }
    }, [inView]);

    return (
        <div ref={ref}>
            {show ? (
                <Section categoryName={categoryName} />
            ) : (
                <p>Loading {categoryName}...</p>
            )}
        </div>
    );
};

export default LazySection;
