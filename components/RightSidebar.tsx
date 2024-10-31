"use client";

import React, { useEffect, useState } from 'react';
import { EditableField } from '@/components/EditableField';
import { headerConfig } from '@/components/EmailHeader';
import { footerConfig } from '@/components/EmailFooter';
import { textConfig } from '@/components/EmailText';
import { imageConfig } from '@/components/EmailImage';

interface RightSidebarProps {
  selectedComponentId: string | null;
  emailContent: { id: string; type: string; [key: string]: any }[];
  setEmailContent: (content: { id: string; type: string; [key: string]: any }[]) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ selectedComponentId, emailContent, setEmailContent }) => {
  const [settings, setSettings] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (selectedComponentId) {
      const selectedComponent = emailContent.find((component) => component.id === selectedComponentId);
      if (selectedComponent) {
        const componentConfig = {
          Header: headerConfig,
          Footer: footerConfig,
          Text: textConfig,
          Image: imageConfig,
        }[selectedComponent.type];

        if (componentConfig) {
          setSettings({ ...selectedComponent, editableFields: componentConfig.editableFields });
        }
      } else {
        setSettings({});
      }
    } else {
      setSettings({});
    }
  }, [selectedComponentId, emailContent]);

  const handleFieldChange = (name: string, value: string) => {
    const newSettings = { ...settings, [name]: value };
    setSettings(newSettings);

    const updatedContent = emailContent.map((component) =>
      component.id === selectedComponentId ? { ...component, [name]: value } : component
    );

    setEmailContent(updatedContent);
  };

  if (!selectedComponentId) return <p>Select a component to edit</p>;

  return (
    <div className="bg-gray-200 p-4 h-screen">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      {settings.editableFields && settings.editableFields.map((field: any) => (
        <EditableField
          key={field.name}
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          name={field.name}
          value={settings[field.name] || field.default}
          onChange={handleFieldChange}
        />
      ))}
    </div>
  );
};
