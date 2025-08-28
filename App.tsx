import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { type Lesson } from './types';
import Loader from './components/Loader';
import Header from './components/Header';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import AddLessonModal from './components/AddLessonModal';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useLocalStorage<Lesson[]>('lessons', []);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddLesson = (newLesson: Omit<Lesson, 'id' | 'createdAt' | 'mcqs' | 'feedback'>) => {
    const lessonWithId: Lesson = {
      ...newLesson,
      id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mcqs: [],
      feedback: undefined,
    };
    setLessons(prev => [...prev, lessonWithId]);
    setIsModalOpen(false);
  };
  
  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setLessons(prev => prev.map(l => l.id === updatedLesson.id ? updatedLesson : l));
    setSelectedLesson(updatedLesson);
  };

  const handleDeleteLesson = (lessonId: string) => {
    setLessons(prev => prev.filter(l => l.id !== lessonId));
    setSelectedLesson(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header onAddLesson={() => setIsModalOpen(true)} />
      <main className="container mx-auto p-4 md:p-8">
        {selectedLesson ? (
          <LessonView 
            lesson={selectedLesson} 
            onBack={() => setSelectedLesson(null)} 
            onDelete={handleDeleteLesson}
            onUpdate={handleUpdateLesson}
          />
        ) : (
          <LessonList lessons={lessons} onSelectLesson={setSelectedLesson} />
        )}
      </main>
      {isModalOpen && (
        <AddLessonModal 
          onClose={() => setIsModalOpen(false)} 
          onAddLesson={handleAddLesson} 
        />
      )}
    </div>
  );
};

export default App;