"use client";

import React from 'react';
import { Section, Container, Text } from '@react-email/components';

export const textConfig = {
  editableFields: [
    { name: 'title', default: 'Your Title Here' },
    { name: 'content', default: 'Your content goes here. Edit this text as needed.' },
  ],
};

interface EmailTextProps {
  title: string;
  content: string;
  onClick?: () => void;
}

export const EmailText: React.FC<EmailTextProps> = ({ title, content, onClick }) => {
  return (
    <Section onClick={onClick} style={{ padding: '10px 0' }}>
      <Container>
        <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</Text>
        <Text style={{ fontSize: '16px', color: '#374151' }}>{content}</Text>
      </Container>
    </Section>
  );
};