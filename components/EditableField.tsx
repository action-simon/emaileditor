import React from 'react';

interface EditableFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};
