'use client';

import { Body, Head, Html, Preview } from '@react-email/components';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import { EmailCTA } from '@/components/EmailCta';
import { EmailFooter } from '@/components/EmailFooter';
import { EmailHeader } from '@/components/EmailHeader';
import { EmailImage } from '@/components/EmailImage';
import { EmailText } from '@/components/EmailText';
import React from 'react';

type ComponentType = 'Header' | 'Footer' | 'Text' | 'Image' | 'CTA';

interface EmailEditorProps {
    emailContent: { id: string; type: ComponentType; [key: string]: any }[];
    setSelectedComponentId: (id: string | null) => void;
}

const componentMap: { [key in ComponentType]: React.FC<any> } = {
    Header: EmailHeader,
    Footer: EmailFooter,
    Text: EmailText,
    Image: EmailImage,
    CTA: EmailCTA
};

export const EmailEditor: React.FC<EmailEditorProps> = ({ emailContent, setSelectedComponentId }) => {
    return (
        <Droppable droppableId='email-editor'>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='h-full overflow-y-auto rounded border bg-white p-4'>
                    {emailContent.map((component, index) => {
                        const Component = componentMap[component.type];

                        return (
                            <Draggable key={component.id} draggableId={component.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => setSelectedComponentId(component.id)}
                                        className='mb-4 cursor-pointer'>
                                        <Component {...component} />
                                    </div>
                                )}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};
