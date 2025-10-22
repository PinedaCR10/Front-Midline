/**
 * Tipos para el sistema de notas del diario
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  wordCount: number;
  isFavorite?: boolean;
  tags?: string[];
}

export interface NoteFormData {
  title: string;
  content: string;
  tags?: string[];
}

export interface NotesStats {
  totalNotes: number;
  totalWords: number;
  currentStreak: number;
  longestStreak: number;
  notesThisMonth: number;
}

export interface NotesFilter {
  searchTerm?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isFavorite?: boolean;
}
