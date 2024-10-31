'use client';

import { Button, Container, Img, Section, Text } from '@react-email/components';

import React from 'react';

export const ctaConfig = {
    editableFields: [
        { name: 'imageSrc', default: 'https://via.placeholder.com/600x200' },
        { name: 'heading', default: 'Join Us Today!' },
        { name: 'text', default: 'Sign up now and get exclusive benefits.' },
        { name: 'buttonText', default: 'Sign Up' },
        { name: 'buttonLink', default: 'https://yourcompany.com/signup' }
    ]
};

interface EmailCTAProps {
    imageSrc: string;
    heading: string;
    text: string;
    buttonText: string;
    buttonLink: string;
    onClick?: () => void;
}

export const EmailCTA: React.FC<EmailCTAProps> = ({ imageSrc, heading, text, buttonText, buttonLink, onClick }) => {
    return (
        <Section onClick={onClick} style={{ padding: '20px 0', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <Container>
                <Img src={imageSrc} alt={heading} style={{ width: '100%', height: 'auto' }} />
                <Text style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>{heading}</Text>
                <Text style={{ fontSize: '16px', color: '#6b7280', margin: '10px 0' }}>{text}</Text>
                <Button
                    href={buttonLink}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        borderRadius: '5px',
                        textDecoration: 'none'
                    }}>
                    {buttonText}
                </Button>
            </Container>
        </Section>
    );
};
