import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Filter, FilterX } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

interface User {
  id: string;
  role: string;
  admin_level: number;
  full_name: string;
  avatar_url: string | null;
  email: string;
  email_confirmed_at: string | null;
  phone: string | null;
  last_sign_in_at: string | null;
  created_at: string;
  is_banned: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    role: "user",
    admin_level: 0,
    full_name: "John Doe",
    avatar_url: null,
    email: "john@example.com",
    email_confirmed_at: "2024-04-15",
    phone: "+33612345678",
    last_sign_in_at: "2024-04-15",
    created_at: "2024-01-01",
    is_banned: false
  },
  {
    id: "2",
    role: "user",
    admin_level: 0,
    full_name: "nazimbelkadi",
    avatar_url: null,
    email: "belkadinazim900@gmail.com",
    email_confirmed_at: "2024-04-15",
    phone: null,
    last_sign_in_at: null,
    created_at: "2024-04-15",
    is_banned: false
  }
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    role: "all",
    adminLevel: "all",
    isBanned: "all",
    emailConfirmed: "all",
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filters.role === "all" || user.role === filters.role;
    const matchesAdminLevel = filters.adminLevel === "all" || user.admin_level.toString() === filters.adminLevel;
    const matchesIsBanned = filters.isBanned === "all" || 
      (filters.isBanned === "true" ? user.is_banned : !user.is_banned);
    const matchesEmailConfirmed = filters.emailConfirmed === "all" ||
      (filters.emailConfirmed === "true" ? user.email_confirmed_at !== null : user.email_confirmed_at === null);
    const matchesDate = selectedDate
      ? format(new Date(user.created_at), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      : true;

    return matchesSearch && matchesRole && matchesAdminLevel && matchesIsBanned && 
           matchesEmailConfirmed && matchesDate;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    setUsers(prevUsers => prevUsers.filter(user => !selectedUsers.includes(user.id)));
    toast({
      title: "Users deleted",
      description: `${selectedUsers.length} user(s) have been deleted.`,
    });
    setSelectedUsers([]);
  };

  const handleResetFilters = () => {
    setFilters({
      role: "all",
      adminLevel: "all",
      isBanned: "all",
      emailConfirmed: "all",
    });
    setSelectedDate(undefined);
  };

  const handleSelectAllUsers = (checked: boolean) => {
    setSelectedUsers(checked ? users.map(user => user.id) : []);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Users</h1>
              {selectedUsers.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete ({selectedUsers.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {selectedUsers.length} selected user(s).
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
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name or email..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Select
                value={filters.role}
                onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.adminLevel}
                onValueChange={(value) => setFilters(prev => ({ ...prev, adminLevel: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Admin Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All levels</SelectItem>
                  <SelectItem value="0">Level 0</SelectItem>
                  <SelectItem value="1">Level 1</SelectItem>
                  <SelectItem value="2">Level 2</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.isBanned}
                onValueChange={(value) => setFilters(prev => ({ ...prev, isBanned: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ban Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Banned</SelectItem>
                  <SelectItem value="false">Not banned</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.emailConfirmed}
                onValueChange={(value) => setFilters(prev => ({ ...prev, emailConfirmed: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Email confirmed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Confirmed</SelectItem>
                  <SelectItem value="false">Not confirmed</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 w-[180px]">
                      <CalendarIcon className="h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, 'dd/MM/yyyy', { locale: fr })
                      ) : (
                        "Creation date"
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

              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleResetFilters}
              >
                <FilterX className="h-4 w-4" />
                Reset filters
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedUsers.length === mockUsers.length}
                        onCheckedChange={handleSelectAllUsers}
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Admin Level</TableHead>
                    <TableHead>Nom complet</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Email confirmé</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead>Créé le</TableHead>
                    <TableHead>Banni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.filter(user => {
                    const matchesSearch = 
                      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      user.id.toLowerCase().includes(searchQuery.toLowerCase());

                    const matchesRole = filters.role === "all" || user.role === filters.role;
                    const matchesAdminLevel = filters.adminLevel === "all" || user.admin_level.toString() === filters.adminLevel;
                    const matchesIsBanned = filters.isBanned === "all" || 
                      (filters.isBanned === "true" ? user.is_banned : !user.is_banned);
                    const matchesEmailConfirmed = filters.emailConfirmed === "all" ||
                      (filters.emailConfirmed === "true" ? user.email_confirmed_at !== null : user.email_confirmed_at === null);
                    const matchesDate = selectedDate
                      ? format(new Date(user.created_at), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                      : true;

                    return matchesSearch && matchesRole && matchesAdminLevel && matchesIsBanned && 
                           matchesEmailConfirmed && matchesDate;
                  }).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.admin_level}</TableCell>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.avatar_url ? "Oui" : "Non"}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.email_confirmed_at ? "Oui" : "Non"}</TableCell>
                      <TableCell>{user.phone || "-"}</TableCell>
                      <TableCell>{user.last_sign_in_at || "-"}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{user.is_banned ? "Oui" : "Non"}</TableCell>
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

export default Users;
