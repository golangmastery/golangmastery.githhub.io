import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  showLineNumbers?: boolean;
  title?: string;
  highlight?: string; // Line numbers to highlight e.g. "1,3-5"
}

// Go keywords for syntax highlighting
const goKeywords = [
  'break', 'default', 'func', 'interface', 'select',
  'case', 'defer', 'go', 'map', 'struct',
  'chan', 'else', 'goto', 'package', 'switch',
  'const', 'fallthrough', 'if', 'range', 'type',
  'continue', 'for', 'import', 'return', 'var',
  'nil', 'true', 'false', 'iota', 'append',
  'cap', 'close', 'complex', 'copy', 'delete',
  'len', 'make', 'new', 'panic', 'print',
  'println', 'recover', 'error'
];

// Go built-in types
const goTypes = [
  'bool', 'byte', 'complex64', 'complex128', 'error', 'float32', 'float64',
  'int', 'int8', 'int16', 'int32', 'int64', 'rune', 'string',
  'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'uintptr'
];

// Common Go packages
const goPackages = [
  'fmt', 'io', 'os', 'strings', 'time', 'net', 'http', 
  'context', 'sync', 'encoding', 'json', 'math', 'reflect',
  'errors', 'bufio', 'bytes', 'log', 'regexp', 'sort'
];

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  className = '', 
  showLineNumbers = true,
  title,
  highlight
}) => {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (format: language-xxx)
  const language = className?.replace(/language-/, '') || '';
  const isGo = language === 'go';
  
  // Ensure children is a string
  const codeString = typeof children === 'string' 
    ? children 
    : children?.toString() || '';

  // Function to highlight Go code
  const highlightGoSyntax = (code: string) => {
    if (!isGo) return code;

    // Handle single-line comments
    let highlightedCode = code.replace(
      /(\/\/.*?)($)/g,
      '<span class="comment">$1</span>$2'
    );

    // Handle multi-line comments (not perfect, but works for simple cases)
    highlightedCode = highlightedCode.replace(
      /(\/\*[\s\S]*?\*\/)/g,
      '<span class="comment">$1</span>'
    );

    // Handle string literals
    highlightedCode = highlightedCode.replace(
      /("(?:\\.|[^"\\])*")/g,
      '<span class="string">$1</span>'
    );
    highlightedCode = highlightedCode.replace(
      /('(?:\\.|[^'\\])*')/g,
      '<span class="string">$1</span>'
    );
    highlightedCode = highlightedCode.replace(
      /(`(?:\\.|[^`\\])*`)/g,
      '<span class="string">$1</span>'
    );

    // Handle numbers
    highlightedCode = highlightedCode.replace(
      /\b(\d+(?:\.\d+)?)\b/g,
      '<span class="number">$1</span>'
    );

    // Handle keywords
    const keywordPattern = new RegExp(`\\b(${goKeywords.join('|')})\\b`, 'g');
    highlightedCode = highlightedCode.replace(
      keywordPattern,
      '<span class="keyword">$1</span>'
    );

    // Handle types
    const typePattern = new RegExp(`\\b(${goTypes.join('|')})\\b`, 'g');
    highlightedCode = highlightedCode.replace(
      typePattern,
      '<span class="type">$1</span>'
    );

    // Handle packages
    const packagePattern = new RegExp(`\\b(${goPackages.join('|')})\\b\\.`, 'g');
    highlightedCode = highlightedCode.replace(
      packagePattern,
      '<span class="package">$1</span>.'
    );

    // Handle function declarations
    highlightedCode = highlightedCode.replace(
      /\b(func)\s+([a-zA-Z0-9_]+)\s*\(/g,
      '<span class="keyword">func</span> <span class="function">$2</span>('
    );

    return highlightedCode;
  };
  
  // Calculate highlighted lines
  const highlightedLines = new Set<number>();
  if (highlight) {
    highlight.split(',').forEach(range => {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          highlightedLines.add(i);
        }
      } else {
        highlightedLines.add(parseInt(range, 10));
      }
    });
  }
  
  // Function to copy code to clipboard
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(codeString).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Split code into lines for line numbers
  const lines = codeString.split('\n');
  
  return (
    <div className="relative my-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
      {/* Header with language and title */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center">
          <CodeBracketIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          {title ? (
            <span className="text-gray-700 dark:text-gray-300 font-medium">{title}</span>
          ) : (
            language && <span className="text-gray-700 dark:text-gray-300 font-mono text-sm">{language}</span>
          )}
        </div>
        
        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors flex items-center gap-1"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code block with optional line numbers */}
      <div className="overflow-x-auto bg-gray-50 dark:bg-gray-900">
        <div className="min-w-full p-4 font-mono text-sm">
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`flex ${highlightedLines.has(i + 1) ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
            >
              {showLineNumbers && (
                <div className="text-gray-400 dark:text-gray-600 text-right select-none w-8 mr-4 flex-shrink-0">
                  {i + 1}
                </div>
              )}
              <div className="flex-grow overflow-x-auto">
                {isGo ? (
                  <code dangerouslySetInnerHTML={{ 
                    __html: highlightGoSyntax(line || '\u00A0') 
                  }} />
                ) : (
                  <code>{line || '\u00A0'}</code>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock; 