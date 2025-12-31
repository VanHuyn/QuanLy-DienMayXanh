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
import { StaffProvider } from "../context/StaffContext";
import { PromotionProvider } from "../context/PromotionContext";
import { RatingProvider } from "../context/RatingContext";
import { RevenueProvider } from "../context/RevenueContext";
import { InvoiceProvider } from "../context/InvoiceContext";
import { QuayProvider } from "../context/QuayContext";
import { ChatProvider } from "../context/ChatContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <RoleProvider>
        <UserProvider>
          <StaffProvider>
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
                                  <OrderProvider>
                                    <PromotionProvider>
                                      <RatingProvider>
                                        <RevenueProvider>
                                          <InvoiceProvider>
                                            <QuayProvider>
                                              <ChatProvider>
                                                {children}
                                              </ChatProvider>
                                            </QuayProvider>
                                          </InvoiceProvider>
                                        </RevenueProvider>
                                      </RatingProvider>
                                    </PromotionProvider>
                                  </OrderProvider>
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
          </StaffProvider>
        </UserProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
