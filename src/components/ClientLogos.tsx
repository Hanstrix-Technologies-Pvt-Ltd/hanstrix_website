import React from 'react';
import Image from 'next/image';

const logos = [
  '/images/airbnb-logo.png',
  '/images/google-logo.png',
  '/images/apple-logo.png',
  '/images/salesforce-logo.png',
  '/images/ibm-logo.png',
  '/images/airbnb-logo.png',
  '/images/google-logo.png',
  '/images/apple-logo.png',
  '/images/salesforce-logo.png',
  '/images/ibm-logo.png',
];

const ClientLogos = () => {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap ">
      <div className="inline-block animate-roll">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="inline-block mx-8 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src={logo}
              alt={`Client Logo ${index + 1}`}
              width={120}
              height={40}
            />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div
            key={`dup-${index}`}
            className="inline-block mx-8 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src={logo}
              alt={`Client Logo ${index + 1}`}
              width={120}
              height={40}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
