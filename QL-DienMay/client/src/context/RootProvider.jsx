import { AuthProvider } from "../context/AuthContext";
import { RoleProvider } from "../context/RoleContext";
import { UserProvider } from "../context/UserContext";
import { SupplierProvider } from "../context/SupplierContext";
import { CategoryProvider } from "../context/CategoryContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <RoleProvider>
        <UserProvider>
          <CategoryProvider>
            <SupplierProvider>{children}</SupplierProvider>
          </CategoryProvider>
        </UserProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
