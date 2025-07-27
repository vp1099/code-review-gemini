import React, { useState, useCallback } from 'react';
import { reviewCodeWithGemini } from './services/geminiService';
import { PLACEHOLDER_CODE } from './constants';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import ReviewOutput from './components/ReviewOutput';
import Footer from './components/Footer';
import { SparklesIcon } from './components/icons/SparklesIcon';

function App() {
  const [code, setCode] = useState<string>(PLACEHOLDER_CODE);
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setReview('');
    try {
      const result = await reviewCodeWithGemini(code);
      // Check if the result indicates an error message from the service
      if (result.startsWith("Error:")) {
        setError(result);
      } else {
        setReview(result);
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3 text-gray-300">Your Code</h2>
          <CodeInput value={code} onChange={setCode} />
          <button
            onClick={handleReview}
            disabled={isLoading || !code.trim()}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Review Code
              </>
            )}
          </button>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3 text-gray-300">AI Review</h2>
          <ReviewOutput review={review} isLoading={isLoading} error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
