import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Plus, Calendar as CalendarIcon } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

interface Product {
  id: number;
  store_id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    store_id: 1,
    name: "T-shirt",
    price: 1999,
    stock: 100,
    created_at: "2024-04-15"
  },
  {
    id: 2,
    store_id: 1,
    name: "Jeans",
    price: 4999,
    stock: 50,
    created_at: "2024-04-15"
  },
  {
    id: 3,
    store_id: 2,
    name: "Sneakers",
    price: 7999,
    stock: 30,
    created_at: "2024-04-15"
  }
];

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    store_id: 0,
    name: "",
    price: 0,
    stock: 0,
    created_at: new Date().toISOString().split('T')[0]
  });
  const { toast } = useToast();

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.id.toString().includes(searchQuery) ||
      product.store_id.toString().includes(searchQuery) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery) ||
      product.stock.toString().includes(searchQuery);

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesDate = selectedDate
      ? format(new Date(product.created_at), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      : true;

    return matchesSearch && matchesPrice && matchesDate;
  });

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteSelected = () => {
    setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
    toast({
      title: "Produits supprimés",
      description: `${selectedProducts.length} produit(s) ont été supprimés.`,
    });
    setSelectedProducts([]);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    setProducts(prev => [...prev, { ...newProduct, id: prev.length + 1 }]);
    toast({
      title: "Produit ajouté",
      description: "Le nouveau produit a été ajouté avec succès.",
    });
    setNewProduct({
      id: 0,
      store_id: 0,
      name: "",
      price: 0,
      stock: 0,
      created_at: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Produits</h1>
              <div className="flex items-center gap-2">
                {selectedProducts.length > 0 ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer ({selectedProducts.length})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible. Cela supprimera définitivement {selectedProducts.length} produit(s) sélectionné(s).
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteSelected}>
                          Continuer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="flex items-center gap-2"
                        style={{ backgroundColor: 'oklch(47.22% 0.1834 290.74)' }}
                      >
                        <Plus className="h-4 w-4" />
                        Ajouter un produit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un produit</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Input
                            placeholder="Store ID"
                            type="number"
                            value={newProduct.store_id}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, store_id: parseInt(e.target.value) }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Nom du produit"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Prix"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddProduct}>Ajouter</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: 'oklch(47.22% 0.1834 290.74)' }} />
              <Input
                placeholder="Rechercher par ID, nom, prix..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex flex-col gap-2 w-[300px]">
                <label className="text-sm font-medium">Filtrer par prix</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{priceRange[0]}€</span>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    step={100}
                    className="flex-1"
                  />
                  <span className="text-sm">{priceRange[1]}€</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, 'dd/MM/yyyy', { locale: fr })
                      ) : (
                        "Filtrer par date"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={fr}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                {selectedDate && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedDate(undefined)}
                    className="h-9 px-2"
                  >
                    ✕
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedProducts.length === products.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProducts(products.map(product => product.id));
                          } else {
                            setSelectedProducts([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Store ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleSelectProduct(product.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.store_id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Products;
