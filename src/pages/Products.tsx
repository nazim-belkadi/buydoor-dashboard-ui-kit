import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Plus, Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const CURRENCY_RATES = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
  DZD: 146.50
};

type Currency = keyof typeof CURRENCY_RATES;

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("EUR");
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    store_id: 0,
    name: "",
    price: 0,
    stock: 0,
    created_at: new Date().toISOString().split('T')[0]
  });
  const [priceInput, setPriceInput] = useState(priceRange[1]);
  const { toast } = useToast();

  const convertPrice = (priceEUR: number, targetCurrency: Currency) => {
    return Math.round(priceEUR * CURRENCY_RATES[targetCurrency]);
  };

  const formatPrice = (price: number, currency: Currency) => {
    const symbols = {
      EUR: "€",
      USD: "$",
      GBP: "£",
      DZD: "DA"
    };
    return `${price} ${symbols[currency]}`;
  };

  const handlePriceInputChange = (value: string) => {
    const newPrice = parseInt(value) || 0;
    const priceInEUR = Math.round(newPrice / CURRENCY_RATES[selectedCurrency]);
    setPriceInput(newPrice);
    setPriceRange([priceRange[0], priceInEUR]);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.id.toString().includes(searchQuery) ||
      product.store_id.toString().includes(searchQuery) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery) ||
      product.stock.toString().includes(searchQuery);

    const convertedPrice = convertPrice(product.price, selectedCurrency);
    const priceInSelectedCurrency = [
      convertPrice(priceRange[0], selectedCurrency),
      priceInput
    ];
    
    const matchesPrice = convertedPrice >= priceInSelectedCurrency[0] && convertedPrice <= priceInSelectedCurrency[1];
    
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
      title: "Products deleted",
      description: `${selectedProducts.length} product(s) have been deleted.`,
    });
    setSelectedProducts([]);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setProducts(prev => [...prev, { ...newProduct, id: prev.length + 1 }]);
    toast({
      title: "Product added",
      description: "The new product has been added successfully.",
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
              <h1 className="text-3xl font-bold">Products</h1>
              <div className="flex items-center gap-2">
                {selectedProducts.length > 0 ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete ({selectedProducts.length})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete {selectedProducts.length} selected product(s).
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteSelected}>
                          Continue
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
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
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
                            placeholder="Name of product"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Price"
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
                        <Button onClick={handleAddProduct}>Add</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: 'oklch(47.22% 0.1834 290.74)' }} />
              <Input
                placeholder="Search by ID, name, price..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <Select
                  value={selectedCurrency}
                  onValueChange={(value: Currency) => setSelectedCurrency(value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR €</SelectItem>
                    <SelectItem value="USD">USD $</SelectItem>
                    <SelectItem value="GBP">GBP £</SelectItem>
                    <SelectItem value="DZD">DZD DA</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex flex-col gap-2 w-[300px]">
                  <label className="text-sm font-medium">Filter by price</label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">
                      {formatPrice(convertPrice(priceRange[0], selectedCurrency), selectedCurrency)}
                    </span>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={10000}
                      step={100}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={priceInput}
                      onChange={(e) => handlePriceInputChange(e.target.value)}
                      className="w-24"
                      min="0"
                    />
                  </div>
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
                        "Filter by date"
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
                      <TableCell>{formatPrice(convertPrice(product.price, selectedCurrency), selectedCurrency)}</TableCell>
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
