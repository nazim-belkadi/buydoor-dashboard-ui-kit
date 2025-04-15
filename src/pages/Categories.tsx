
import { useState } from "react";
import { Plus, Search, Filter, Trash2, Edit, FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoryTree from "@/components/categories/CategoryTree";
import CategoryDialog from "@/components/categories/CategoryDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  children: Category[];
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);

  const handleAddCategory = (newCategory: Category) => {
    if (parentCategoryId) {
      setCategories(prev => addSubCategory(prev, parentCategoryId, newCategory));
    } else {
      setCategories(prev => [...prev, newCategory]);
    }
  };

  const addSubCategory = (categories: Category[], parentId: string, newCategory: Category): Category[] => {
    return categories.map(category => {
      if (category.id === parentId) {
        return {
          ...category,
          children: [...category.children, newCategory],
        };
      }
      if (category.children.length > 0) {
        return {
          ...category,
          children: addSubCategory(category.children, parentId, newCategory),
        };
      }
      return category;
    });
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Gestion des Catégories</CardTitle>
            <Button 
              onClick={() => {
                setParentCategoryId(null);
                setShowCategoryDialog(true);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2" />
              Nouvelle Catégorie
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CategoryTree 
            categories={categories} 
            onAddSubCategory={(parentId) => {
              setParentCategoryId(parentId);
              setShowCategoryDialog(true);
            }}
            onDeleteCategory={(categoryId) => {
              setCategories(prev => deleteCategory(prev, categoryId));
            }}
            searchQuery={searchQuery}
          />
        </CardContent>
      </Card>

      <CategoryDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        onAdd={handleAddCategory}
        parentId={parentCategoryId}
      />
    </div>
  );
}

const deleteCategory = (categories: Category[], categoryId: string): Category[] => {
  return categories.filter(category => {
    if (category.id === categoryId) {
      return false;
    }
    if (category.children.length > 0) {
      category.children = deleteCategory(category.children, categoryId);
    }
    return true;
  });
};
