import React from 'react';
import Link from 'next/link';
import CodeBlock from './CodeBlock';
import Image from 'next/image';

interface MDXComponentsProps {
  [key: string]: React.ComponentType<any>;
}

const MDXComponents: MDXComponentsProps = {
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold mt-3 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
  a: (props: any) => {
    // Handle special case for [Run] links that point to Go Playground
    if (props.children === 'Run' && props.href?.includes('play.golang.org')) {
      return (
        <a
          href={props.href}
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Run in Go Playground &rarr;
        </a>
      );
    }
    
    return (
      <Link 
        href={props.href || '#'} 
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
        {...(props.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {props.children}
      </Link>
    );
  },
  ul: (props: any) => <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  pre: (props: any) => {
    // This is needed to pass the MDX pre tag through to children
    return <div {...props} />;
  },
  code: (props: any) => {
    const { children, className } = props;
    
    // If this code has a language class, it's a block (not inline)
    if (className && className.startsWith('language-')) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    
    // For inline code snippets
    return <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm text-gray-800 dark:text-gray-200" {...props} />;
  },
  img: (props: any) => <img className="max-w-full h-auto rounded-lg my-6" alt={props.alt || ''} {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-50 dark:bg-gray-700" {...props} />,
  tbody: (props: any) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />,
  tr: (props: any) => <tr {...props} />,
  th: (props: any) => <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-700 font-semibold text-left" {...props} />,
  td: (props: any) => <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props} />,
};

export default MDXComponents;
