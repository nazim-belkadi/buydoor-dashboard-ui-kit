import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Folder, FolderPlus, Edit, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Category {
  id: string;
  name: string;
  children: Category[];
  popularity?: number;
}

interface CategoryTreeProps {
  categories: Category[];
  onAddSubCategory: (parentId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  searchQuery: string;
  level?: number;
}

const searchInCategory = (category: Category, query: string): boolean => {
  const matchesName = category.name.toLowerCase().includes(query.toLowerCase());
  const hasMatchingChildren = category.children.some(child => searchInCategory(child, query));
  return matchesName || hasMatchingChildren;
};

export default function CategoryTree({ 
  categories: initialCategories, 
  onAddSubCategory, 
  onDeleteCategory,
  searchQuery,
  level = 0 
}: CategoryTreeProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [sortType, setSortType] = useState<"default" | "popularity">("default");
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    let sortedCategories = [...initialCategories];
    if (sortType === "popularity") {
      sortedCategories.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    setCategories(sortedCategories);
  }, [sortType, initialCategories]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const updateOpenCategories = (categories: Category[], query: string) => {
    categories.forEach(category => {
      if (searchInCategory(category, query)) {
        setOpenCategories(prev => new Set(prev).add(category.id));
        if (category.children.length > 0) {
          updateOpenCategories(category.children, query);
        }
      }
    });
  };

  useEffect(() => {
    if (searchQuery) {
      updateOpenCategories(categories, searchQuery);
    }
  }, [searchQuery, categories]);

  const filteredCategories = categories.filter(category =>
    searchInCategory(category, searchQuery)
  );

  if (filteredCategories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end mb-4">
        <ToggleGroup type="single" value={sortType} onValueChange={(value) => value && setSortType(value as "default" | "popularity")}>
          <ToggleGroupItem value="default">Par défaut</ToggleGroupItem>
          <ToggleGroupItem value="popularity" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Popularité
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="space-y-2">
        {filteredCategories.map(category => (
          <div key={category.id} className="rounded-lg border bg-card text-card-foreground">
            <Collapsible 
              open={openCategories.has(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <div className="flex items-center p-2 hover:bg-accent rounded-lg transition-colors">
                <CollapsibleTrigger className="flex items-center flex-1 gap-2">
                  {category.children.length > 0 ? (
                    openCategories.has(category.id) ? (
                      <ChevronDown className="h-4 w-4" style={{ color: 'oklch(47.22% 0.1834 290.74)' }} />
                    ) : (
                      <ChevronRight className="h-4 w-4" style={{ color: 'oklch(47.22% 0.1834 290.74)' }} />
                    )
                  ) : (
                    <Folder className="h-4 w-4" style={{ color: 'oklch(47.22% 0.1834 290.74)' }} />
                  )}
                  <span className="font-medium">{category.name}</span>
                </CollapsibleTrigger>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    style={{ color: 'oklch(47.22% 0.1834 290.74)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddSubCategory(category.id);
                    }}
                  >
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    style={{ color: 'oklch(47.22% 0.1834 290.74)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(category.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {category.children.length > 0 && (
                <CollapsibleContent>
                  <div className="pl-6 mt-2">
                    <CategoryTree
                      categories={category.children}
                      onAddSubCategory={onAddSubCategory}
                      onDeleteCategory={onDeleteCategory}
                      searchQuery={searchQuery}
                      level={level + 1}
                    />
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
}
