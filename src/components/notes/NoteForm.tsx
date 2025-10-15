import { useState, useEffect } from 'react';
import { X, Save, Tag } from 'lucide-react';
import { Note, NoteFormData } from '../../types/notes';
import { motion, AnimatePresence } from 'framer-motion';

interface NoteFormProps {
  note?: Note;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: NoteFormData) => void;
}

/**
 * Formulario para crear o editar notas del diario
 */
export default function NoteForm({ note, isOpen, onClose, onSubmit }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    content: '',
    tags: [],
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar formulario cuando se abre
  useEffect(() => {
    if (isOpen) {
      if (note) {
        setFormData({
          title: note.title,
          content: note.content,
          tags: note.tags || [],
        });
      } else {
        setFormData({
          title: '',
          content: '',
          tags: [],
        });
      }
      setNewTag('');
    }
  }, [isOpen, note]);

  const handleInputChange = (field: keyof NoteFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
          >
            <div className="w-full max-w-2xl max-h-full bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold text-white">
                  {note ? 'Editar nota' : 'Nueva nota'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(100vh-200px)]">
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  {/* Título */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                      Título
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Escribe un título para tu nota..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Contenido */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                      Contenido
                    </label>
                    <textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Escribe tus pensamientos, reflexiones, o lo que quieras recordar..."
                      rows={12}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {formData.content.trim().split(/\s+/).filter(word => word.length > 0).length} palabras
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Etiquetas
                    </label>
                    
                    {/* Input para nueva etiqueta */}
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          placeholder="Agregar etiqueta..."
                          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!newTag.trim()}
                        className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Agregar
                      </button>
                    </div>

                    {/* Lista de etiquetas */}
                    {formData.tags && formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Presiona Ctrl+Enter para guardar rápidamente
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.title.trim() || !formData.content.trim() || isSubmitting}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                      {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
