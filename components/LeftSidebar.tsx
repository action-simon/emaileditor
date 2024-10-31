"use client";

import React, { useState } from 'react';

import { Draggable, Droppable } from '@hello-pangea/dnd';

const COMPONENTS = ['Header', 'Footer'];

export const LeftSidebar = () => (
    <Droppable droppableId='left-sidebar'>
        {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='h-full bg-gray-200 p-4'>
                <h3 className='mb-4 text-lg font-semibold'>Components</h3>
                {COMPONENTS.map((component, index) => (
                    <Draggable key={component} draggableId={component} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className='mb-3 cursor-pointer rounded bg-gray-300 p-2'>
                                {component}
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder} {/* Placeholder for Droppable */}
            </div>
        )}
    </Droppable>
);
