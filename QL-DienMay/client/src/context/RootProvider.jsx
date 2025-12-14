import { AuthProvider } from "../context/AuthContext";
import { RoleProvider } from "../context/RoleContext";
import { UserProvider } from "../context/UserContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <RoleProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
