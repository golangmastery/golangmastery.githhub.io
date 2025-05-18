import React from 'react';
import Link from 'next/link';
import CodeBlock from './CodeBlock';
import Image from 'next/image';
import Container from './Container';

interface MDXComponentsProps {
  [key: string]: React.ComponentType<any>;
}

const MDXComponents: MDXComponentsProps = {
  h1: (props: any) => (
    <h1 
      className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-800"
      {...props} 
    />
  ),
  h2: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    return (
      <h2 
        id={id} 
        className="group text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white flex items-center" 
        {...props}
      >
        {props.children}
        <a 
          href={`#${id}`} 
          className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" 
          aria-label="Link to this heading"
        >
          #
        </a>
      </h2>
    );
  },
  h3: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    return (
      <h3 
        id={id}
        className="group text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center" 
        {...props}
      >
        {props.children}
        <a 
          href={`#${id}`} 
          className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" 
          aria-label="Link to this heading"
        >
          #
        </a>
      </h3>
    );
  },
  h4: (props: any) => <h4 className="text-lg font-bold mt-6 mb-2 text-gray-800 dark:text-gray-200" {...props} />,
  p: (props: any) => <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg" {...props} />,
  a: (props: any) => {
    // Handle special case for [Run] links that point to Go Playground
    if (props.children === 'Run' && props.href?.includes('play.golang.org')) {
      return (
        <a
          href={props.href}
          className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-colors duration-150 ease-in-out font-medium"
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
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-150"
        {...(props.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {props.children}
      </Link>
    );
  },
  ul: (props: any) => <ul className="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-300 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 mb-6 text-gray-700 dark:text-gray-300 space-y-2" {...props} />,
  li: (props: any) => <li className="mb-1 text-lg" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-1 my-6 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-gray-800/50 rounded-r-md" {...props} />
  ),
  pre: (props: any) => {
    // This is needed to pass the MDX pre tag through to children
    return <div {...props} />;
  },
  code: (props: any) => {
    const { children, className, title, highlight, showLineNumbers, ...rest } = props;
    
    // If this code has a language class, it's a block (not inline)
    if (className && className.startsWith('language-')) {
      return (
        <CodeBlock 
          className={className}
          title={title}
          highlight={highlight}
          showLineNumbers={showLineNumbers !== "false"}
        >
          {children}
        </CodeBlock>
      );
    }
    
    // For inline code snippets
    return <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm text-gray-800 dark:text-gray-200" {...rest}>{children}</code>;
  },
  img: (props: any) => (
    <div className="my-8">
      <img 
        className="max-w-full h-auto rounded-lg shadow-md dark:shadow-gray-900/30" 
        alt={props.alt || ''} 
        loading="lazy"
        {...props} 
      />
      {props.alt && (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2 italic">
          {props.alt}
        </p>
      )}
    </div>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-8 shadow-md rounded-lg">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-50 dark:bg-gray-700" {...props} />,
  tbody: (props: any) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />,
  tr: (props: any) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-750" {...props} />,
  th: (props: any) => <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-gray-100 dark:bg-gray-700 font-semibold text-left text-gray-700 dark:text-gray-200" {...props} />,
  td: (props: any) => <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300" {...props} />,
  hr: (props: any) => <hr className="my-8 border-t border-gray-300 dark:border-gray-700" {...props} />,
  // Add custom components
  Callout: ({ children, type = 'info' }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500',
      error: 'bg-red-50 dark:bg-red-900/20 border-red-500',
      tip: 'bg-green-50 dark:bg-green-900/20 border-green-500',
    };
    
    return (
      <div className={`p-4 my-6 border-l-4 rounded-r-md ${styles[type as keyof typeof styles]}`}>
        {children}
      </div>
    );
  },
  Section: ({ children, animate = true }) => (
    <Container 
      withBackground={true} 
      maxWidth="prose" 
      className="my-8" 
      animation={animate ? "fadeIn" : "none"}
      rounded="lg"
      shadow="md"
    >
      {children}
    </Container>
  ),
};

export default MDXComponents;
