import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex-grow w-full h-full relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your code here..."
        spellCheck="false"
        className="w-full h-full min-h-[400px] lg:min-h-0 p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 font-mono text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y transition-colors duration-200"
      />
    </div>
  );
};

export default CodeInput;
