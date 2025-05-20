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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentMethod {
  id: string;
  name: string;
  type: "COD" | "CIB" | "BaridiMob";
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    name: "COD (Cash On Delivery)",
    type: "COD"
  },
  {
    id: "2",
    name: "CIB",
    type: "CIB"
  },
  {
    id: "3",
    name: "Baridi Mob",
    type: "BaridiMob"
  }
];

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [newPayment, setNewPayment] = useState<{ id: string; name: string; type: PaymentMethod['type'] }>({
    id: "",
    name: "",
    type: "COD"
  });
  const { toast } = useToast();

  const filteredMethods = paymentMethods.filter(method =>
    method.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethods(prev =>
      prev.includes(methodId)
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    );
  };

  const handleDeleteSelected = () => {
    setPaymentMethods(prev => prev.filter(method => !selectedMethods.includes(method.id)));
    toast({
      title: "Méthodes de paiement supprimées",
      description: `${selectedMethods.length} méthode(s) de paiement ont été supprimées.`,
    });
    setSelectedMethods([]);
  };

  const handleAddPayment = () => {
    if (!newPayment.id || !newPayment.name || !newPayment.type) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const exists = paymentMethods.some(method => method.id === newPayment.id);
    if (exists) {
      toast({
        title: "Erreur",
        description: "Cet ID existe déjà",
        variant: "destructive",
      });
      return;
    }

    setPaymentMethods(prev => [...prev, newPayment]);
    toast({
      title: "Méthode de paiement ajoutée",
      description: "La nouvelle méthode de paiement a été ajoutée avec succès.",
    });
    setNewPayment({ id: "", name: "", type: "COD" });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Payment Methods</h1>
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
                          This action cannot be undone. This will permanently delete {selectedMethods.length} selected payment method(s).
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
                        <DialogTitle>Add Payment Method</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Input
                            placeholder="Method ID"
                            value={newPayment.id}
                            onChange={(e) => setNewPayment(prev => ({ ...prev, id: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Method Name"
                            value={newPayment.name}
                            onChange={(e) => setNewPayment(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Select
                            value={newPayment.type}
                            onValueChange={(value: PaymentMethod['type']) => 
                              setNewPayment(prev => ({ ...prev, type: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Payment Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="COD">Cash On Delivery (COD)</SelectItem>
                              <SelectItem value="CIB">CIB</SelectItem>
                              <SelectItem value="BaridiMob">Baridi Mob</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddPayment}>Add</Button>
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
                placeholder="Search by ID, name or type..."
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
                        checked={selectedMethods.length === paymentMethods.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMethods(paymentMethods.map(method => method.id));
                          } else {
                            setSelectedMethods([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
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

export default Payments;