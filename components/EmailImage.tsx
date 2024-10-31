"use client";

import React from 'react';
import { Section, Container, Img } from '@react-email/components';

export const imageConfig = {
  editableFields: [
    { name: 'url', default: 'https://cdn.shopify.com/s/files/1/0799/1482/8116/files/renata-adrienn-ksXr8TrRmvE-unsplash.jpg?v=1730291300' },
    { name: 'alt', default: 'Default Alt Text' },
  ],
};

interface EmailImageProps {
  url: string;
  alt: string;
  onClick?: () => void;
}

export const EmailImage: React.FC<EmailImageProps> = ({ url, alt, onClick }) => {
  return (
    <Section onClick={onClick} style={{ padding: '10px 0' }}>
      <Container>
        <Img src={url} alt={alt} style={{ width: '100%', height: 'auto' }} />
      </Container>
    </Section>
  );
};