"use client";

import React from 'react';
import { Section, Container, Text } from '@react-email/components';

export const headerConfig = {
  editableFields: [
    { name: 'companyName', default: 'Your Company Name' },
    { name: 'tagline', default: 'Your Tagline Here' },
  ],
};

interface EmailHeaderProps {
  companyName: string;
  tagline: string;
  onClick?: () => void;
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({ companyName, tagline, onClick }) => {
  return (
    <Section onClick={onClick} style={{ padding: '20px 0', backgroundColor: '#f3f4f6', textAlign: 'center' }}>
      <Container>
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>{companyName}</Text>
        <Text style={{ fontSize: '16px', color: '#6b7280' }}>{tagline}</Text>
      </Container>
    </Section>
  );
};
