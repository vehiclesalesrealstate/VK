import React from 'react';

const Maps = () => {
    return (
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d249.18503581865025!2d-79.89753297953371!3d-2.1686971224536378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMTAnMDcuMiJTIDc5wrA1Myc1MC41Ilc!5e0!3m2!1ses!2sec!4v1706184005233!5m2!1ses!2sec"
            width="100%"
            height="650"
            style={{ border: 0, width: '100%', height: '100%' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    );
};

export default Maps;
