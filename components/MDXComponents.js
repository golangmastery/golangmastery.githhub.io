import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Enhanced code block component with better syntax highlighting
const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Extract language from className (format: language-xxx)
  const language = className ? className.replace('language-', '') : '';

  // Map language to a more readable name
  const getLanguageLabel = (lang) => {
    const languageMap = {
      'js': 'JavaScript',
      'jsx': 'React JSX',
      'ts': 'TypeScript',
      'tsx': 'React TSX',
      'go': 'Go',
      'py': 'Python',
      'rb': 'Ruby',
      'java': 'Java',
      'php': 'PHP',
      'cs': 'C#',
      'cpp': 'C++',
      'c': 'C',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'json': 'JSON',
      'yaml': 'YAML',
      'md': 'Markdown',
      'bash': 'Bash',
      'sh': 'Shell',
      'sql': 'SQL',
      'graphql': 'GraphQL',
      'dockerfile': 'Dockerfile',
    };

    return languageMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  // Safely convert children to string
  const getCodeString = () => {
    if (typeof children === 'string') return children;
    if (children === null || children === undefined) return '';
    if (typeof children === 'object' && children.props && children.props.children) {
      return typeof children.props.children === 'string'
        ? children.props.children
        : '';
    }
    return String(children);
  };

  const code = getCodeString();

  // Only split into lines if we have a string
  const getLines = () => {
    try {
      return code.split('\n').map(line => line || ' ');
    } catch (e) {
      console.error('Error splitting code into lines:', e);
      return [''];
    }
  };

  const codeLines = getLines();

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy to clipboard:', e);
    }
  };

  // Get language-specific background colors
  const getLanguageColors = () => {
    const colorMap = {
      'go': 'from-blue-900 to-blue-800',
      'js': 'from-yellow-900 to-yellow-800',
      'jsx': 'from-blue-900 to-indigo-800',
      'ts': 'from-blue-900 to-blue-800',
      'tsx': 'from-blue-900 to-indigo-800',
      'py': 'from-green-900 to-green-800',
      'rb': 'from-red-900 to-red-800',
      'html': 'from-orange-900 to-orange-800',
      'css': 'from-purple-900 to-purple-800',
      'json': 'from-gray-900 to-gray-800',
      'bash': 'from-gray-900 to-gray-800',
      'sh': 'from-gray-900 to-gray-800',
    };

    return colorMap[language] || 'from-gray-900 to-gray-800';
  };

  return (
    <div className="relative group my-8">
      <div className={`flex items-center justify-between bg-gradient-to-r ${getLanguageColors()} text-gray-200 px-4 py-2 text-sm rounded-t-lg`}>
        <div className="flex items-center">
          <span className="text-xs uppercase tracking-wide font-semibold">{getLanguageLabel(language) || 'Code'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className="flex items-center space-x-1 bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white rounded px-2 py-1 text-xs font-medium transition-colors duration-200"
            title={showLineNumbers ? "Hide line numbers" : "Show line numbers"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white rounded px-2 py-1 text-xs font-medium transition-colors duration-200"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="relative">
        <pre className={`${className || ''} rounded-b-lg p-0 overflow-x-auto bg-gray-900 text-gray-100 shadow-md m-0`}>
          <div className="p-4 flex">
            {showLineNumbers && (
              <div className="select-none text-gray-500 mr-4 text-right">
                {codeLines.map((_, i) => (
                  <div key={i} className="leading-relaxed">{i + 1}</div>
                ))}
              </div>
            )}
            <code className={className || ''}>
              {codeLines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line}
                </div>
              ))}
            </code>
          </div>
        </pre>
      </div>
    </div>
  );
};

// Callout component for important notes with icons
const Callout = ({ children, type = 'info', title }) => {
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-500 text-blue-800',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: title || 'Information'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-500 text-yellow-800',
      icon: (
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: title || 'Warning'
    },
    error: {
      container: 'bg-red-50 border-red-500 text-red-800',
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: title || 'Error'
    },
    tip: {
      container: 'bg-green-50 border-green-500 text-green-800',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: title || 'Tip'
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`${style.container} border-l-4 p-4 my-6 rounded-lg`}>
      <div className="flex items-center mb-2">
        {style.icon}
        <h5 className="ml-2 font-bold">{style.title}</h5>
      </div>
      <div className="ml-8">{children}</div>
    </div>
  );
};

// File structure component for showing directory trees
const FileTree = ({ children }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg my-6 font-mono text-sm">
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

// Step component for tutorials
const Step = ({ number, title, children }) => {
  return (
    <div className="my-8">
      <div className="flex items-center mb-4">
        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
          {number}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="ml-11">{children}</div>
    </div>
  );
};

// Terminal output component
const Terminal = ({ children }) => {
  return (
    <div className="my-6">
      <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-400 text-sm">Terminal</div>
      </div>
      <div className="bg-black rounded-b-lg p-4 text-gray-300 font-mono text-sm overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

// Table of Contents component
const TableOfContents = ({ headings }) => {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-5 my-6 border border-gray-200">
      <h3 className="text-lg font-bold mb-3 text-gray-800">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li key={index} className={`${heading.level > 2 ? 'ml-4' : ''}`}>
            <Link
              href={`#${heading.id}`}
              className={`text-blue-600 hover:text-blue-800 hover:underline flex items-center ${
                heading.level === 2 ? 'font-medium' : ''
              }`}
            >
              <span className="mr-2">
                {heading.level === 2 ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Function to create heading with anchor link
const createHeadingWithAnchor = (level, className) => {
  return props => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    return React.createElement(
      level,
      {
        id,
        className,
        ...props
      },
      <>
        {props.children}
        <button
          onClick={() => {
            // Create a URL object to get the pathname without query params
            const url = new URL(window.location.href);
            // Update the hash
            url.hash = id;
            // Update browser history
            window.history.pushState({}, '', url.toString());
            // Copy to clipboard
            navigator.clipboard.writeText(url.toString());
          }}
          className="ml-2 text-gray-400 opacity-0 hover:opacity-100 group-hover:opacity-70 transition-opacity duration-200"
          aria-label={`Copy link to ${props.children}`}
        >
          <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
        </button>
      </>
    );
  };
};

const MDXComponents = {
  h1: createHeadingWithAnchor('h1', "text-4xl font-bold mt-12 mb-6 text-gray-900 border-b pb-3 border-gray-200 group"),
  h2: createHeadingWithAnchor('h2', "text-3xl font-bold mt-10 mb-4 text-gray-900 border-b pb-2 border-gray-100 group"),
  h3: createHeadingWithAnchor('h3', "text-2xl font-bold mt-8 mb-3 text-gray-800 group"),
  h4: createHeadingWithAnchor('h4', "text-xl font-bold mt-6 mb-2 text-gray-800 group"),

  p: props => (
    <p className="my-4 text-gray-700 leading-relaxed text-lg" {...props} />
  ),

  a: ({ href, children, ...props }) => {
    if (href && href.startsWith('/')) {
      return (
        <Link href={href} className="text-blue-600 hover:text-blue-800 underline" {...props}>
          {children}
        </Link>
      );
    }

    if (href && (href.startsWith('http') || href.startsWith('mailto:'))) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" {...props}>
          {children}
        </a>
      );
    }

    return <a href={href} className="text-blue-600 hover:text-blue-800 underline" {...props}>{children}</a>;
  },

  ul: props => (
    <ul className="list-disc pl-8 my-6 space-y-3 text-gray-700" {...props} />
  ),

  ol: props => (
    <ol className="list-decimal pl-8 my-6 space-y-3 text-gray-700" {...props} />
  ),

  li: props => (
    <li className="mb-2 pl-1 marker:text-blue-500" {...props} />
  ),

  blockquote: props => (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 rounded-r-lg text-gray-700 italic" {...props} />
  ),

  code: props => {
    const { children, className } = props;

    if (className) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }

    return (
      <code className="bg-gray-100 text-blue-700 rounded-md px-2 py-1 font-mono text-sm font-medium" {...props} />
    );
  },

  img: props => (
    <div className="my-10">
      <img
        src={props.src}
        alt={props.alt || ''}
        className="rounded-lg shadow-md mx-auto max-w-full hover:shadow-lg transition-shadow duration-300"
        loading="lazy"
        {...props}
      />
      {props.alt && (
        <p className="text-center text-sm text-gray-500 mt-3 italic">{props.alt}</p>
      )}
    </div>
  ),

  table: props => (
    <div className="overflow-x-auto my-10 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200" {...props} />
    </div>
  ),

  thead: props => (
    <thead className="bg-gray-50" {...props} />
  ),

  tbody: props => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),

  tr: props => (
    <tr className="hover:bg-gray-50 transition-colors duration-200" {...props} />
  ),

  th: props => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),

  td: props => (
    <td className="px-6 py-4 text-sm text-gray-500" {...props} />
  ),

  hr: props => (
    <hr className="my-10 border-gray-200" {...props} />
  ),

  // Custom components
  Callout: Callout,
  FileTree: FileTree,
  Step: Step,
  Terminal: Terminal,
  TableOfContents: TableOfContents,
};

export default MDXComponents;
