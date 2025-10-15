# Sistema de Notas del Diario

Este módulo implementa un sistema completo de notas para el diario personal, con un diseño moderno y estético similar a aplicaciones de diario populares.

## Características

### ✨ Funcionalidades Principales
- **Crear, editar y eliminar notas** con interfaz intuitiva
- **Sistema de favoritos** para marcar notas importantes
- **Búsqueda en tiempo real** por título y contenido
- **Filtros avanzados** (favoritos, etiquetas, fechas)
- **Estadísticas detalladas** (palabras escritas, rachas, etc.)
- **Persistencia local** usando localStorage
- **Diseño responsivo** optimizado para móvil y desktop

### 🎨 Diseño y UX
- **Tema oscuro** con gradientes púrpura/gris
- **Tarjetas con glassmorphism** y efectos de blur
- **Animaciones fluidas** con Framer Motion
- **Iconos consistentes** usando Lucide React
- **Tipografía clara** y jerarquía visual

## Componentes

### `NotesSection`
Componente principal que orquesta toda la funcionalidad:
- Header con título y botón de nueva nota
- Estadísticas de uso
- Filtros y búsqueda
- Lista de notas con animaciones

### `NoteCard`
Tarjeta individual para cada nota:
- Título y fecha formateada
- Contenido con preview expandible
- Botones de acción (favorito, editar, eliminar)
- Contador de palabras y etiquetas

### `NoteForm`
Formulario modal para crear/editar notas:
- Campos de título y contenido
- Sistema de etiquetas
- Validación en tiempo real
- Atajos de teclado (Ctrl+Enter)

### `NotesStats`
Panel de estadísticas con métricas:
- Racha de días/semanas
- Total de palabras escritas
- Notas del mes actual
- Iconos coloridos para cada métrica

## Hook Personalizado

### `useNotes`
Hook que maneja toda la lógica de estado:
- CRUD completo de notas
- Persistencia en localStorage
- Cálculo de estadísticas
- Filtrado y búsqueda
- Gestión de favoritos

## Tipos TypeScript

```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  wordCount: number;
  isFavorite?: boolean;
  tags?: string[];
}

interface NotesStats {
  totalNotes: number;
  totalWords: number;
  currentStreak: number;
  longestStreak: number;
  notesThisMonth: number;
}
```

## Uso

```tsx
import { NotesSection } from './components/notes';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <NotesSection />
    </div>
  );
}
```

## Personalización

### Colores
Los colores se pueden personalizar modificando las clases de Tailwind:
- `bg-gray-900` - Fondo principal
- `bg-purple-900` - Gradiente secundario
- `bg-blue-500` - Color de acento
- `text-white` - Texto principal
- `text-gray-400` - Texto secundario

### Animaciones
Las animaciones se controlan con Framer Motion:
- `initial`, `animate`, `exit` - Estados de animación
- `transition` - Configuración de timing
- `variants` - Reutilización de animaciones

## Dependencias

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **React Hook Form** - Manejo de formularios

## Persistencia

Las notas se guardan automáticamente en `localStorage` con la clave `diary-notes`. Los datos incluyen:
- Contenido completo de las notas
- Metadatos (fechas, conteo de palabras)
- Configuraciones de favoritos y etiquetas

## Responsive Design

El diseño se adapta a diferentes tamaños de pantalla:
- **Móvil**: Layout de una columna, botones grandes
- **Tablet**: Grid de 2 columnas para estadísticas
- **Desktop**: Layout optimizado con más espacio

## Accesibilidad

- Navegación por teclado completa
- Etiquetas ARIA apropiadas
- Contraste de colores optimizado
- Textos alternativos para iconos
- Focus visible en todos los elementos interactivos
