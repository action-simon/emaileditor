'use client';

import React, { useState } from 'react';

import { ctaConfig } from '@/components/EmailCta';
import { EmailEditor } from '@/components/EmailEditor';
import { footerConfig } from '@/components/EmailFooter';
import { headerConfig } from '@/components/EmailHeader';
import { imageConfig } from '@/components/EmailImage';
import { textConfig } from '@/components/EmailText';
import { RightSidebar } from '@/components/RightSidebar';
import ThemeSwitch from '@/components/ThemeSwitch';
import { Button } from '@/components/ui/button';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';

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

    const handleLoadTemplate = () => {
        const savedTemplate = localStorage.getItem('emailTemplate');
        if (savedTemplate) {
            setEmailContent(JSON.parse(savedTemplate));
        } else {
            console.log('No template found in local storage.');
        }
    };

    const handleSaveTemplate = () => {
        const templateToSave = emailContent;
        console.log('Template saved:', templateToSave);
        localStorage.setItem('emailTemplate', JSON.stringify(templateToSave));
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === 'left-sidebar' && destination.droppableId === 'email-editor') {
            const componentType = result.draggableId;

            const configMap: { [key: string]: any } = {
                Header: headerConfig,
                Text: textConfig,
                Footer: footerConfig,
                Image: imageConfig,
                CTA: ctaConfig
            };

            const newComponent = {
                id: Date.now().toString(),
                type: componentType,
                ...Object.fromEntries(
                    configMap[componentType]?.editableFields.map((field: any) => [field.name, field.default]) || []
                )
            };

            setEmailContent((prev) => [...prev, newComponent]);
        } else if (source.droppableId === 'email-editor' && destination.droppableId === 'email-editor') {
            const reorderedContent = Array.from(emailContent);
            const [removed] = reorderedContent.splice(source.index, 1);
            reorderedContent.splice(destination.index, 0, removed);
            setEmailContent(reorderedContent);
        }
    };

    const handleRemoveComponent = (id: string) => {
        setEmailContent((prev) => prev.filter((component) => component.id !== id));
    };

    const handleAddComponent = (componentType: string) => {
        const configMap: { [key: string]: any } = {
            Header: headerConfig,
            Text: textConfig,
            Footer: footerConfig,
            Image: imageConfig,
            CTA: ctaConfig
        };

        const newComponent = {
            id: Date.now().toString(),
            type: componentType,
            ...Object.fromEntries(
                configMap[componentType]?.editableFields.map((field: any) => [field.name, field.default]) || []
            )
        };

        setEmailContent((prev) => [...prev, newComponent]);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='grid h-full grid-cols-4 gap-4'>
                <div className='h-screen bg-gray-100 p-4'>
                    <h2 className='mb-4 text-lg font-bold'>Components</h2>
                    <Droppable droppableId='left-sidebar'>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {availableComponents.map((component, index) => (
                                    <Draggable key={component.id} draggableId={component.id} index={index}>
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
                            </div>
                        )}
                    </Droppable>
                    <div className='mt-8 flex flex-col items-center justify-center gap-2'>
                        <Button variant={'outline'} onClick={handleLoadTemplate}>
                            Load Template
                        </Button>

                        <Button variant={'outline'} onClick={handleSaveTemplate}>
                            Save Template
                        </Button>
                    </div>
                    <ThemeSwitch />
                    <h2 className='mb-4 mt-8 text-lg font-bold'>Email Structure</h2>
                    <Droppable droppableId='email-editor'>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className='h-full p-4'>
                                {emailContent.map((component, index) => (
                                    <Draggable key={component.id} draggableId={component.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className='mb-2 rounded border bg-white p-4'>
                                                <div className='flex justify-between'>
                                                    <span
                                                        className='cursor-pointer'
                                                        onClick={() => setSelectedComponentId(component.id)}>
                                                        {component.type}
                                                    </span>
                                                    <button
                                                        onClick={() => handleRemoveComponent(component.id)}
                                                        className='ml-2 text-red-500'>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

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
