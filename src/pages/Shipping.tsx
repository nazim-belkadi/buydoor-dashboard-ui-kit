import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Plus } from "lucide-react";
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

interface ShippingMethod {
  id: string;
  name: string;
  base_price: number;
}

const mockShippingMethods: ShippingMethod[] = [
  {
    id: "1",
    name: "Standard Shipping",
    base_price: 900
  },
  {
    id: "2",
    name: "Local Pickup",
    base_price: 0
  }
];

const Shipping = () => {
  const [shippingMethods, setShippingMethods] = useState(mockShippingMethods);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [newShipping, setNewShipping] = useState<ShippingMethod>({
    id: "",
    name: "",
    base_price: 0
  });
  const { toast } = useToast();

  const filteredMethods = shippingMethods.filter(method =>
    method.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.base_price.toString().includes(searchQuery)
  );

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethods(prev =>
      prev.includes(methodId)
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    );
  };

  const handleDeleteSelected = () => {
    setShippingMethods(prev => prev.filter(method => !selectedMethods.includes(method.id)));
    toast({
      title: "Shipping Methods Deleted",
      description: `${selectedMethods.length} shipping method(s) have been deleted.`,
    });
    setSelectedMethods([]);
  };

  const handleAddShipping = () => {
    if (!newShipping.id || !newShipping.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const exists = shippingMethods.some(method => method.id === newShipping.id);
    if (exists) {
      toast({
        title: "Error",
        description: "This ID already exists",
        variant: "destructive",
      });
      return;
    }

    setShippingMethods(prev => [...prev, newShipping]);
    toast({
      title: "Shipping Method Added",
      description: "The new shipping method has been added successfully.",
    });
    setNewShipping({ id: "", name: "", base_price: 0 });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Shipping Methods</h1>
              <div className="flex items-center gap-2">
                {selectedMethods.length > 0 ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete ({selectedMethods.length})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete {selectedMethods.length} selected shipping method(s).
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
                        Add Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Shipping Method</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Input
                            placeholder="Method ID"
                            value={newShipping.id}
                            onChange={(e) => setNewShipping(prev => ({ ...prev, id: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Method Name"
                            value={newShipping.name}
                            onChange={(e) => setNewShipping(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Input
                            type="number"
                            placeholder="Base Price"
                            value={newShipping.base_price}
                            onChange={(e) => setNewShipping(prev => ({ ...prev, base_price: Number(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddShipping}>Add</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div className="relative">
              <Search 
                className="absolute left-3 top-3 h-4 w-4" 
                style={{ color: 'oklch(47.22% 0.1834 290.74)' }} 
              />
              <Input
                placeholder="Search by ID, name or price..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedMethods.length === shippingMethods.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMethods(shippingMethods.map(method => method.id));
                          } else {
                            setSelectedMethods([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Base Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMethods.includes(method.id)}
                          onCheckedChange={() => handleSelectMethod(method.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{method.id}</TableCell>
                      <TableCell>{method.name}</TableCell>
                      <TableCell>{method.base_price}</TableCell>
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

export default Shipping;
