import Link from 'next/link';
import Image from 'next/image';

interface MDXComponentsProps {
  [key: string]: React.ComponentType<any>;
}

const MDXComponents: MDXComponentsProps = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold mt-3 mb-2" {...props} />,
  p: (props: any) => <p className="my-4 text-gray-700" {...props} />,
  a: (props: any) => {
    if (props.href && (props.href.startsWith('/') || props.href.startsWith('#'))) {
      return (
        <Link href={props.href} className="text-blue-600 hover:text-blue-800 underline">
          {props.children}
        </Link>
      );
    }
    return (
      <a
        href={props.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={props.href.startsWith('http') ? "_blank" : undefined}
        rel={props.href.startsWith('http') ? "noopener noreferrer" : undefined}
      >
        {props.children}
      </a>
    );
  },
  ul: (props: any) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
  code: (props: any) => {
    const { children, className } = props;
    const language = className ? className.replace('language-', '') : '';
    
    if (className) {
      return (
        <pre className={`${className} rounded-md p-4 overflow-x-auto my-4 bg-gray-100`}>
          <code className={className}>{children}</code>
        </pre>
      );
    }
    
    return (
      <code className="bg-gray-100 rounded-md px-1 py-0.5 font-mono text-sm">{children}</code>
    );
  },
  img: (props: any) => (
    <div className="my-6">
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={800}
        height={450}
        className="rounded-md"
      />
    </div>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-50" {...props} />,
  tbody: (props: any) => <tbody className="divide-y divide-gray-200" {...props} />,
  tr: (props: any) => <tr {...props} />,
  th: (props: any) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: any) => <td className="px-6 py-4 whitespace-nowrap" {...props} />,
};

export default MDXComponents;
