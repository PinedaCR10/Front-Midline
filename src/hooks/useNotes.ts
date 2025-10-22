import { useState, useEffect, useCallback } from 'react';
import type { Note, NoteFormData, NotesStats, NotesFilter } from '../types/notes';

const STORAGE_KEY = 'diary-notes';

/**
 * Hook personalizado para manejar las notas del diario
 */
export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar notas desde localStorage
  const loadNotes = useCallback(() => {
    try {
      const storedNotes = localStorage.getItem(STORAGE_KEY);
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar notas en localStorage
  const saveNotes = useCallback((newNotes: Note[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }, []);

  // Crear nueva nota
  const createNote = useCallback((formData: NoteFormData): Note => {
    const now = new Date();
    const wordCount = formData.content.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: formData.title,
      content: formData.content,
      createdAt: now,
      updatedAt: now,
      wordCount,
      isFavorite: false,
      tags: formData.tags || [],
    };

    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    return newNote;
  }, [notes, saveNotes]);

  // Actualizar nota existente
  const updateNote = useCallback((id: string, formData: NoteFormData): Note | null => {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) return null;

    const wordCount = formData.content.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    const updatedNote: Note = {
      ...notes[noteIndex],
      title: formData.title,
      content: formData.content,
      updatedAt: new Date(),
      wordCount,
      tags: formData.tags || [],
    };

    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = updatedNote;
    saveNotes(updatedNotes);
    return updatedNote;
  }, [notes, saveNotes]);

  // Eliminar nota
  const deleteNote = useCallback((id: string): boolean => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    return true;
  }, [notes, saveNotes]);

  // Toggle favorito
  const toggleFavorite = useCallback((id: string): boolean => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    saveNotes(updatedNotes);
    return true;
  }, [notes, saveNotes]);

  // Obtener estadísticas
  const getStats = useCallback((): NotesStats => {
    const totalNotes = notes.length;
    const totalWords = notes.reduce((sum, note) => sum + note.wordCount, 0);
    
    // Calcular racha actual (días consecutivos con al menos una nota)
    const sortedNotes = [...notes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    if (sortedNotes.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Calcular racha actual
      const uniqueDates = new Set(
        sortedNotes.map(note => note.createdAt.toDateString())
      );
      const sortedDates = Array.from(uniqueDates).sort((a, b) => 
        new Date(b).getTime() - new Date(a).getTime()
      );
      
      for (let i = 0; i < sortedDates.length; i++) {
        const noteDate = new Date(sortedDates[i]);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        
        if (noteDate.toDateString() === expectedDate.toDateString()) {
          currentStreak++;
        } else {
          break;
        }
      }
      
      // Calcular racha más larga
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const currentDate = new Date(sortedDates[i]);
        const nextDate = new Date(sortedDates[i + 1]);
        const diffDays = Math.floor(
          (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak + 1);
          tempStreak = 0;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak + 1);
    }
    
    // Notas del mes actual
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const notesThisMonth = notes.filter(note => 
      note.createdAt.getMonth() === currentMonth && 
      note.createdAt.getFullYear() === currentYear
    ).length;

    return {
      totalNotes,
      totalWords,
      currentStreak,
      longestStreak,
      notesThisMonth,
    };
  }, [notes]);

  // Filtrar notas
  const filterNotes = useCallback((filter: NotesFilter): Note[] => {
    let filteredNotes = [...notes];

    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower)
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      filteredNotes = filteredNotes.filter(note =>
        filter.tags!.some(tag => note.tags?.includes(tag))
      );
    }

    if (filter.isFavorite !== undefined) {
      filteredNotes = filteredNotes.filter(note => note.isFavorite === filter.isFavorite);
    }

    if (filter.dateRange) {
      filteredNotes = filteredNotes.filter(note => {
        const noteDate = note.createdAt;
        return noteDate >= filter.dateRange!.start && noteDate <= filter.dateRange!.end;
      });
    }

    return filteredNotes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [notes]);

  // Cargar notas al montar el componente
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes,
    isLoading,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    getStats,
    filterNotes,
  };
};
