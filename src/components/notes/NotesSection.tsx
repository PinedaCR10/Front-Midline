import { useState } from 'react';
import { Plus, Search, Filter, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../../hooks/useNotes';
import type { Note, NoteFormData, NotesFilter } from '../../types/notes';
import NotesStats from './NotesStats';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';

/**
 * Sección principal de notas del diario
 */
export default function NotesSection() {
  const {
    isLoading,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    getStats,
    filterNotes,
  } = useNotes();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const stats = getStats();
  const filter: NotesFilter = {
    searchTerm: searchTerm || undefined,
    isFavorite: showFavoritesOnly || undefined,
  };
  const filteredNotes = filterNotes(filter);

  const handleCreateNote = async (formData: NoteFormData) => {
    createNote(formData);
  };

  const handleUpdateNote = async (formData: NoteFormData) => {
    if (editingNote) {
      updateNote(editingNote.id, formData);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      deleteNote(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNote(undefined);
  };

  const handleSubmitForm = (formData: NoteFormData) => {
    if (editingNote) {
      handleUpdateNote(formData);
    } else {
      handleCreateNote(formData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/20">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Diario</h1>
            <p className="text-gray-600 text-sm">Tus pensamientos y reflexiones</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nueva nota
        </button>
      </div>

      {/* Estadísticas */}
      <NotesStats stats={stats} />

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar en tus notas..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>
        
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
            showFavoritesOnly
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-gray-50 text-gray-600 border border-gray-200 hover:text-gray-900'
          }`}
        >
          <Filter className="w-5 h-5" />
          Favoritos
        </button>
      </div>

      {/* Lista de notas */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 inline-block">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {searchTerm || showFavoritesOnly ? 'No se encontraron notas' : 'Aún no tienes notas'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm || showFavoritesOnly 
                    ? 'Intenta ajustar tus filtros de búsqueda'
                    : 'Comienza escribiendo tu primera nota del diario'
                  }
                </p>
                {!searchTerm && !showFavoritesOnly && (
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Crear primera nota
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onToggleFavorite={toggleFavorite}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Formulario de notas */}
      <NoteForm
        note={editingNote}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
}
