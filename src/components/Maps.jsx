/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

const Maps = () => {
    return (
        <>
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3986.960699911978!2d-79.89995692591356!3d-2.16864899781209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMTAnMDcuMSJTIDc5wrA1Myc1MC42Ilc!5e0!3m2!1sen!2sec!4v1706478121905!5m2!1sen!2sec" width="600" height="450"
                // eslint-disable-next-line react/jsx-no-duplicate-props
                style={{
                    width: '100%', height: '450px', border: 0,
                    justifyContent: 'center', alignItems: 'center', alignContent: 'center', textAlign: 'center'
                }}
                allowFullScreen=""
                // eslint-disable-next-line react/jsx-no-duplicate-props
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </>
    )
};

export default Maps;
