import React from 'react';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

// A simple component to parse and render markdown-like text from Gemini
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const elements = React.useMemo(() => {
    const lines = content.split('\n');
    const renderedElements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockLang = '';
  
    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          renderedElements.push(
            <div key={`code-${index}`} className="my-4 bg-gray-900/70 rounded-md overflow-hidden border border-gray-700">
              <div className="flex justify-between items-center px-4 py-1 bg-gray-700/50 text-gray-400 text-xs font-sans">
                <span>{codeBlockLang || 'code'}</span>
                <button onClick={() => navigator.clipboard.writeText(codeBlockContent.trim())} className="text-gray-400 hover:text-white transition-colors">Copy</button>
              </div>
              <pre className="p-4 text-sm whitespace-pre-wrap font-mono">
                <code>{codeBlockContent}</code>
              </pre>
            </div>
          );
          inCodeBlock = false;
          codeBlockContent = '';
          codeBlockLang = '';
        } else {
          inCodeBlock = true;
          codeBlockLang = line.substring(3).trim();
        }
        return;
      }
  
      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        return;
      }
  
      if (line.startsWith('## ')) {
        renderedElements.push(<h2 key={index} className="text-2xl font-bold mt-6 mb-3 border-b border-gray-700 pb-2">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        renderedElements.push(<h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>);
      } else if (line.match(/^\s*\*\s/)) {
        renderedElements.push(<li key={index} className="ml-5 list-disc my-1">{line.replace(/^\s*\*\s/, '')}</li>);
      } else if (line.trim() !== '') {
        renderedElements.push(<p key={index} className="my-2 leading-relaxed">{line}</p>);
      }
    });
    
    return renderedElements;
  }, [content]);


  return <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-li:text-gray-300">{elements}</div>;
};


const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  return (
    <div className="flex-grow w-full h-full p-6 bg-gray-800 border border-gray-700 rounded-lg overflow-y-auto min-h-[468px] lg:min-h-0 relative transition-all duration-300">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/80 backdrop-blur-sm z-10">
          <svg className="w-12 h-12 text-indigo-500 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 6-6-6m6 6v6m0-6H9m3 6h6m-6 0v6m6 0v-6m-6 0H3m6 0-6 6" />
          </svg>
          <p className="mt-4 text-lg text-gray-300">Gemini is thinking...</p>
          <p className="text-sm text-gray-500">Analyzing your code for greatness.</p>
        </div>
      )}
      {error && (
        <div className="text-red-400 p-4 bg-red-900/20 rounded-lg">
          <h3 className="font-bold text-red-300">An Error Occurred</h3>
          <p className="whitespace-pre-wrap">{error}</p>
        </div>
      )}
      {!isLoading && !error && !review && (
        <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
            <svg className="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-400">Ready for Review</h3>
            <p className="mt-1">Enter code on the left and click "Review Code" to start.</p>
        </div>
      )}
      {review && <MarkdownRenderer content={review} />}
    </div>
  );
};

export default ReviewOutput;
