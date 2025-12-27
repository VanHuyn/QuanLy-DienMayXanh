import { AuthProvider } from "../context/AuthContext";
import { RoleProvider } from "../context/RoleContext";
import { UserProvider } from "../context/UserContext";
import { SupplierProvider } from "../context/SupplierContext";
import { CategoryProvider } from "../context/CategoryContext";
import { ProductProvider } from "../context/ProductContext";
import { WarehouseProvider } from "../context/WarehouseContext";
import { SupplierImportProvider } from "../context/SupplierImportContext";
import { SupplierImportDetailProvider } from "../context/SupplierImportDetailContext";
import { ProductVariantProvider } from "../context/ProductVariantContext";
import { InventoryProvider } from "../context/InventoryContext";
import { BranchProvider } from "../context/BranchContext";
import { BranchWarehouseProvider } from "../context/BranchWarehouseContext";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <RoleProvider>
        <UserProvider>
          <CategoryProvider>
            <SupplierProvider>
              <ProductProvider>
                <WarehouseProvider>
                  <SupplierImportProvider>
                    <SupplierImportDetailProvider>
                      <ProductVariantProvider>
                        <InventoryProvider>
                          <BranchProvider>
                            <BranchWarehouseProvider>
                              <CartProvider>
                                <OrderProvider>{children}</OrderProvider>
                              </CartProvider>
                            </BranchWarehouseProvider>
                          </BranchProvider>
                        </InventoryProvider>
                      </ProductVariantProvider>
                    </SupplierImportDetailProvider>
                  </SupplierImportProvider>
                </WarehouseProvider>
              </ProductProvider>
            </SupplierProvider>
          </CategoryProvider>
        </UserProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
