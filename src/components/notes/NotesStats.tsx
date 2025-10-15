import { Flame, MessageCircle, Calendar, BookOpen } from 'lucide-react';
import type { NotesStats as NotesStatsType } from '../../types/notes';

interface NotesStatsProps {
  stats: NotesStatsType;
}

/**
 * Componente para mostrar estadísticas de las notas del diario
 */
export default function NotesStats({ stats }: NotesStatsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* Racha de semanas */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
        <div className="p-2 rounded-lg bg-orange-500/20">
          <Flame className="w-4 h-4 text-orange-400" />
        </div>
        <div>
          <p className="text-white font-semibold text-lg">
            {Math.floor(stats.currentStreak / 7)}
          </p>
          <p className="text-gray-300 text-xs">semanas de racha</p>
        </div>
      </div>

      {/* Palabras escritas */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <MessageCircle className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="text-white font-semibold text-lg">
            {formatNumber(stats.totalWords)}
          </p>
          <p className="text-gray-300 text-xs">palabras escritas</p>
        </div>
      </div>

      {/* Días de racha */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
        <div className="p-2 rounded-lg bg-green-500/20">
          <Calendar className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <p className="text-white font-semibold text-lg">
            {stats.currentStreak}
          </p>
          <p className="text-gray-300 text-xs">días de racha</p>
        </div>
      </div>

      {/* Notas del mes */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <BookOpen className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <p className="text-white font-semibold text-lg">
            {stats.notesThisMonth}
          </p>
          <p className="text-gray-300 text-xs">notas este mes</p>
        </div>
      </div>
    </div>
  );
}
