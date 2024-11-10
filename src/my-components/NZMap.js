import React from 'react';
//Map of Newzealand  unfortunatly not interactive
const NZMap = () => {
  const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26889718.03689595!2d174.00621764521723!3d-40.90055702071679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38b0f2a8e5d40b%3A0xd7c82cbe53f6d93f!2sNew%20Zealand!5e0!3m2!1sen!2sus!4v1637721590241!5m2!1sen!2sus&z=5"; // Adjusted the zoom level

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        title="Map of New Zealand"
        src={googleMapsUrl}
        style={{ height: '100%', width: '100%', border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
  );
};

export default NZMap;
