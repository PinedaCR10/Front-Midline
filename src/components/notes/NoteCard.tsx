import { useState } from 'react';
import { ChevronDown, MoreHorizontal, Heart, Edit, Trash2 } from 'lucide-react';
import type { Note } from '../../types/notes';
import { motion, AnimatePresence } from 'framer-motion';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

/**
 * Componente para mostrar una nota individual en formato de tarjeta
 */
export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Hoy';
    } else if (diffDays === 2) {
      return 'Ayer';
    } else if (diffDays <= 7) {
      return `Hace ${diffDays - 1} días`;
    }
    
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    });
  };

  const getPreviewText = (content: string, maxLength: number = 150): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    switch (action) {
      case 'edit':
        onEdit(note);
        break;
      case 'delete':
        onDelete(note.id);
        break;
      case 'favorite':
        onToggleFavorite(note.id);
        break;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 shadow-sm"
    >
      {/* Header de la tarjeta */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold text-lg mb-1 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-gray-500 text-sm">
            {formatDate(note.createdAt)}
          </p>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {/* Botón de favorito */}
          <button
            onClick={() => onToggleFavorite(note.id)}
            className={`p-2 rounded-lg transition-colors ${
              note.isFavorite 
                ? 'bg-red-50 text-red-500' 
                : 'bg-gray-50 text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart 
              className={`w-4 h-4 ${note.isFavorite ? 'fill-current' : ''}`} 
            />
          </button>
          
          {/* Menú de opciones */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl z-10"
                >
                  <div className="p-2">
                    <button
                      onClick={() => handleMenuAction('edit')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleMenuAction('favorite')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      {note.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                    </button>
                    <button
                      onClick={() => handleMenuAction('delete')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Contenido de la nota */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {isExpanded ? note.content : getPreviewText(note.content)}
        </p>
      </div>

      {/* Footer de la tarjeta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{note.wordCount} palabras</span>
          {note.tags && note.tags.length > 0 && (
            <div className="flex items-center gap-1">
              {note.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              {note.tags.length > 2 && (
                <span className="text-xs">+{note.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
        
        {note.content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="text-sm">
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}
