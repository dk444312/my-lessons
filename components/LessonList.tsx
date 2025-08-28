import React from 'react';
import { type Lesson } from '../types';
import { BookOpenIcon } from './IconComponents';

interface LessonListProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
}

const LessonList: React.FC<LessonListProps> = ({ lessons, onSelectLesson }) => {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in-down">
        <BookOpenIcon className="h-16 w-16 mx-auto text-slate-500 mb-4" />
        <h2 className="text-2xl font-semibold text-slate-300">No lessons yet!</h2>
        <p className="text-slate-400 mt-2">Click "New Lesson" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-down">
      {lessons
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((lesson, index) => (
        <div
          key={lesson.id}
          onClick={() => onSelectLesson(lesson)}
          className="bg-slate-800 rounded-xl p-6 cursor-pointer border border-transparent hover:border-sky-500 transition-all duration-300 group transform hover:-translate-y-1 flex flex-col justify-between"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
        >
          <div>
            <h3 className="text-xl font-bold text-sky-400 group-hover:text-sky-300 transition-colors">{lesson.title}</h3>
            <p className="text-slate-300 mt-4 line-clamp-3 text-ellipsis">
              {lesson.notes.substring(0, 100) || 'No notes yet.'}
            </p>
          </div>
          <div className="mt-4">
            {lesson.course && (
                <span className="inline-block bg-slate-700 text-sky-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    {lesson.course}
                </span>
            )}
            <p className="text-sm text-slate-400 mt-2">
              Created on: {new Date(lesson.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonList;