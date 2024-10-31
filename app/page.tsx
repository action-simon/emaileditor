'use client';

import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import React, { useState } from 'react';

import { EmailEditor } from '@/components/EmailEditor';
import { RightSidebar } from '@/components/RightSidebar';
import { ctaConfig } from '@/components/EmailCta';
import { footerConfig } from '@/components/EmailFooter';
import { headerConfig } from '@/components/EmailHeader';
import { imageConfig } from '@/components/EmailImage';
import { textConfig } from '@/components/EmailText';

const availableComponents = [
    { id: 'Header', name: 'Header' },
    { id: 'Text', name: 'Text' },
    { id: 'Footer', name: 'Footer' },
    { id: 'Image', name: 'Image' },
    { id: 'CTA', name: 'Call to Action' }
];

export default function Home() {
    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
    const [emailContent, setEmailContent] = useState<{ id: string; type: string; [key: string]: any }[]>([]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === 'left-sidebar' && destination.droppableId === 'email-editor') {
            const componentType = result.draggableId;

            const newComponent = {
                id: Date.now().toString(),
                type: componentType,
                ...(componentType === 'Header'
                    ? {
                          companyName: headerConfig.editableFields[0].default,
                          tagline: headerConfig.editableFields[1].default
                      }
                    : {}),
                ...(componentType === 'Text'
                    ? { title: textConfig.editableFields[0].default, content: textConfig.editableFields[1].default }
                    : {}),
                ...(componentType === 'Footer'
                    ? {
                          copyright: footerConfig.editableFields[0].default,
                          contactInfo: footerConfig.editableFields[1].default
                      }
                    : {}),
                ...(componentType === 'Image'
                    ? { url: imageConfig.editableFields[0].default, alt: imageConfig.editableFields[1].default }
                    : {}),
                ...(componentType === 'CTA'
                    ? {
                          imageSrc: ctaConfig.editableFields[0].default,
                          heading: ctaConfig.editableFields[1].default,
                          text: ctaConfig.editableFields[2].default,
                          buttonText: ctaConfig.editableFields[3].default,
                          buttonLink: ctaConfig.editableFields[4].default
                      }
                    : {})
            };

            setEmailContent((prev) => [...prev, newComponent]);
        } else if (source.droppableId === 'email-editor' && destination.droppableId === 'email-editor') {
            const reorderedContent = Array.from(emailContent);
            const [removed] = reorderedContent.splice(source.index, 1);
            reorderedContent.splice(destination.index, 0, removed);
            setEmailContent(reorderedContent);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='grid grid-cols-4 gap-4'>
                <Droppable droppableId='left-sidebar'>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className='h-screen bg-gray-100 p-4'>
                            <h2 className='mb-4 text-lg font-bold'>Components</h2>
                            {availableComponents.map((component) => (
                                <Draggable key={component.id} draggableId={component.id} index={0}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className='mb-2 cursor-pointer rounded border bg-white p-2 hover:bg-gray-200'>
                                            {component.name}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <div className='mt-8 flex flex-col items-center justify-center gap-2'>
                                <button className='w-full rounded-lg bg-white p-2 transition hover:bg-gray-50'>
                                    Load Template
                                </button>
                                <button className='w-full rounded-lg bg-white p-2 transition hover:bg-gray-50'>
                                    Save Template
                                </button>
                            </div>
                        </div>
                    )}
                </Droppable>

                <div className='col-span-2'>
                    <EmailEditor emailContent={emailContent} setSelectedComponentId={setSelectedComponentId} />
                </div>

                <RightSidebar
                    selectedComponentId={selectedComponentId}
                    emailContent={emailContent}
                    setEmailContent={setEmailContent}
                />
            </div>
        </DragDropContext>
    );
}
