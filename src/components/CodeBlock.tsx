import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className = '' }) => {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (format: language-xxx)
  const language = className?.replace(/language-/, '') || '';
  
  // Ensure children is a string
  const codeString = typeof children === 'string' 
    ? children 
    : children?.toString() || '';
  
  // Function to copy code to clipboard
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(codeString).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  
  return (
    <div className="relative my-6">
      {/* Language badge */}
      {language && (
        <div className="absolute top-0 right-0 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-bl rounded-tr z-10">
          {language}
        </div>
      )}
      
      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="absolute top-0 right-12 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-bl z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <CheckIcon className="inline-block w-4 h-4 mr-1 text-green-500" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <ClipboardIcon className="inline-block w-4 h-4 mr-1" />
            <span>Copy</span>
          </>
        )}
      </button>
      
      {/* Code block */}
      <pre className="overflow-x-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 pt-8">
        <code className={className}>
          {codeString}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock; 