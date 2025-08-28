
import React from 'react';
import { BookOpenIcon, PlusIcon } from './IconComponents';

interface HeaderProps {
  onAddLesson: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddLesson }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="h-8 w-8 text-sky-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">My Lessons</h1>
        </div>
        <button
          onClick={onAddLesson}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Lesson</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
