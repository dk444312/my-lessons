
import React, { useState } from 'react';
import { type Lesson, type MCQ } from '../types';
import { generateMCQs } from '../services/geminiService';
import { SparklesIcon } from './IconComponents';

interface MCQGeneratorProps {
  lesson: Lesson;
  onUpdate: (lesson: Lesson) => void;
}

const MCQGenerator: React.FC<MCQGeneratorProps> = ({ lesson, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);

  const handleGenerateMCQs = async () => {
    if (!lesson.notes) {
      setError("Cannot generate questions without lesson notes.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const newMcqs = await generateMCQs(lesson.notes);
      onUpdate({ ...lesson, mcqs: newMcqs });
      setRevealedAnswers([]);
    } catch (err) {
      setError("Failed to generate questions. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAnswer = (index: number) => {
    setRevealedAnswers(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Test Your Knowledge</h2>
        <button
          onClick={handleGenerateMCQs}
          disabled={isLoading || !lesson.notes}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              {lesson.mcqs.length > 0 ? 'Regenerate Questions' : 'Generate Questions'}
            </>
          )}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      {!lesson.notes && <p className="text-slate-400 text-center">Add some notes to your lesson to generate questions.</p>}

      {lesson.mcqs.length > 0 && (
        <div className="space-y-6">
          {lesson.mcqs.map((mcq, index) => (
            <div key={index} className="bg-slate-700 p-4 rounded-lg">
              <p className="font-semibold text-lg">{index + 1}. {mcq.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
                {mcq.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-3 rounded-md text-left text-sm ${
                      revealedAnswers.includes(index) && option === mcq.correctAnswer
                        ? 'bg-green-500/80 text-white font-bold'
                        : 'bg-slate-600'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <button
                onClick={() => toggleAnswer(index)}
                className="text-sm font-semibold text-sky-400 hover:text-sky-300"
              >
                {revealedAnswers.includes(index) ? 'Hide Answer' : 'Show Answer'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MCQGenerator;
