"use client";

import React from 'react';
import { Section, Container, Text } from '@react-email/components';

export const footerConfig = {
  editableFields: [
    { name: 'copyright', default: '© 2023 Your Company' },
    { name: 'contactInfo', default: 'Contact us at support@yourcompany.com' },
  ],
};

interface EmailFooterProps {
  copyright: string;
  contactInfo: string;
  onClick?: () => void;
}

export const EmailFooter: React.FC<EmailFooterProps> = ({ copyright, contactInfo, onClick }) => {
  return (
    <Section onClick={onClick} style={{ padding: '20px 0', backgroundColor: '#f9fafb', textAlign: 'center' }}>
      <Container>
        <Text style={{ fontSize: '14px', color: '#9ca3af' }}>{copyright}</Text>
        <Text style={{ fontSize: '14px', color: '#9ca3af' }}>{contactInfo}</Text>
      </Container>
    </Section>
  );
};