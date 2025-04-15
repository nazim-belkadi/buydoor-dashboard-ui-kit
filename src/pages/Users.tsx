
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Filter, FilterX } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    role: "all",
    adminLevel: "all",
    isBanned: "all",
    emailConfirmed: "all",
  });

  const filteredUsers = mockUsers.filter(user => {
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

    return matchesSearch && matchesRole && matchesAdminLevel && matchesIsBanned && matchesEmailConfirmed;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    console.log("Deleting users:", selectedUsers);
  };

  const handleResetFilters = () => {
    setFilters({
      role: "all",
      adminLevel: "all",
      isBanned: "all",
      emailConfirmed: "all",
    });
  };

  const handleSelectAllUsers = (checked: boolean) => {
    setSelectedUsers(checked ? mockUsers.map(user => user.id) : []);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Utilisateurs</h1>
              {selectedUsers.length > 0 && (
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer ({selectedUsers.length})
                </Button>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID, nom ou email..."
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
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="user">Utilisateur</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.adminLevel}
                onValueChange={(value) => setFilters(prev => ({ ...prev, adminLevel: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Niveau Admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les niveaux</SelectItem>
                  <SelectItem value="0">Niveau 0</SelectItem>
                  <SelectItem value="1">Niveau 1</SelectItem>
                  <SelectItem value="2">Niveau 2</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.isBanned}
                onValueChange={(value) => setFilters(prev => ({ ...prev, isBanned: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut Ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="true">Banni</SelectItem>
                  <SelectItem value="false">Non banni</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.emailConfirmed}
                onValueChange={(value) => setFilters(prev => ({ ...prev, emailConfirmed: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Email confirmé" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="true">Confirmé</SelectItem>
                  <SelectItem value="false">Non confirmé</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleResetFilters}
              >
                <FilterX className="h-4 w-4" />
                Réinitialiser les filtres
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
                  {filteredUsers.map((user) => (
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
