import { Zap, Calendar, GraduationCap, Briefcase, Users, Package } from 'lucide-react';

type CategoryType = 'live' | 'upcoming' | 'student' | 'corporate' | 'family' | 'general';

interface Category {
  id: CategoryType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: 'live', label: 'Live Booking', icon: Zap },
  { id: 'upcoming', label: 'Upcoming', icon: Calendar },
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'corporate', label: 'Corporate', icon: Briefcase },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'general', label: 'General', icon: Package },
];

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm
                transition-all duration-300 border
                ${isActive
                  ? 'bg-[hsl(var(--brand-orange))] text-white border-[hsl(var(--brand-orange))] shadow-lg scale-105'
                  : 'backdrop-blur-md bg-white/80 border-white/50 text-gray-700 hover:bg-white hover:border-[hsl(var(--brand-orange))]/30 hover:scale-105'
                }
              `}
              aria-pressed={isActive}
              aria-label={`Filter by ${category.label}`}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
