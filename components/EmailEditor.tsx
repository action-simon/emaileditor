"use client";

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { EmailHeader } from '@/components/EmailHeader';
import { EmailFooter } from '@/components/EmailFooter';
import { EmailText } from '@/components/EmailText';
import { EmailImage } from '@/components/EmailImage';


type ComponentType = 'Header' | 'Footer' | 'Text';

interface EmailEditorProps {
  emailContent: { id: string; type: ComponentType; [key: string]: any }[];
  setSelectedComponentId: (id: string | null) => void;
}

const componentMap: { [key in ComponentType]: React.FC<any> } = {
  Header: EmailHeader,
  Footer: EmailFooter,
  Text: EmailText,
  Image: EmailImage,
};

export const EmailEditor: React.FC<EmailEditorProps> = ({ emailContent, setSelectedComponentId }) => {
  return (
    <Droppable droppableId="email-editor">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-white border rounded p-4 h-full overflow-y-auto"
        >
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
                    className="mb-4 cursor-pointer"
                  >
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
