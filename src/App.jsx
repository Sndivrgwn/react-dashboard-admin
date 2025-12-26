import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login/LoginPage";
import Register from "./components/auth/register/RegisterPage";
import Profile from "./components/auth/profile/ProfilePage";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./components/auth/forgot_password/ForgotPassword";
import ResetPassword from "./components/auth/reset_password/ResetPassword";
import PageNotFound from "./components/error/ErrorPageNotFound";
import TwoFactorAuth from "./components/auth/2fa/TwoFactorAuth";
import AppLayout from "./components/layout/AppLayout";
import BackgroundAnimation from "./components/template/BackgroundAnimation";
import BasicTablesPage from "./components/tables/basic/BasicTablesPage";
import ProductsPage from "./components/ecommerce/products/ProductsPage";
import AddProductPage from "./components/ecommerce/products/AddProductPage";
import BrandsPage from "./components/ecommerce/brands/BrandsPage";
import CategoriesPage from "./components/ecommerce/categories/CategoriesPage";
import { ProductsProvider } from "./context/ProductsContext";
import { CatalogProvider } from "./context/CatalogContext";

function PlaceholderPage({ title, description }) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-2 text-white">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-white/60">
        {description || "This section is ready when you are."}
      </p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BackgroundAnimation />

      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<TwoFactorAuth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route
              element={
                <ProductsProvider>
                  <CatalogProvider>
                    <Outlet />
                  </CatalogProvider>
                </ProductsProvider>
              }
            >
              <Route index element={<PlaceholderPage title="Dashboard" />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/assistant"
                element={<PlaceholderPage title="AI Assistant" />}
              />
              <Route
                path="/ecommerce"
                element={<PlaceholderPage title="E-commerce" />}
              />
              <Route path="/ecommerce/products" element={<ProductsPage />} />
              <Route path="/ecommerce/brands" element={<BrandsPage />} />
              <Route path="/ecommerce/categories" element={<CategoriesPage />} />
              <Route path="/ecommerce/add-product" element={<AddProductPage />} />
              <Route
                path="/ecommerce/billing"
                element={<PlaceholderPage title="Billing" />}
              />
              <Route
                path="/ecommerce/invoice"
                element={<PlaceholderPage title="Invoice" />}
              />
              <Route
                path="/ecommerce/invoice/single"
                element={<PlaceholderPage title="Single Invoice" />}
              />
              <Route
                path="/ecommerce/invoice/create"
                element={<PlaceholderPage title="Create Invoice" />}
              />
              <Route
                path="/ecommerce/transactions"
                element={<PlaceholderPage title="Transaction" />}
              />
              <Route
                path="/ecommerce/transactions/add"
                element={<PlaceholderPage title="Add Transactions" />}
              />
              <Route
                path="/ecommerce/receipt"
                element={<PlaceholderPage title="Receipt" />}
              />
              <Route
                path="/ecommerce/refund"
                element={<PlaceholderPage title="Refund" />}
              />
              <Route
                path="/calendar"
                element={<PlaceholderPage title="Calendar" />}
              />
              <Route path="/tasks" element={<PlaceholderPage title="Tasks" />} />
              <Route path="/forms" element={<PlaceholderPage title="Forms" />} />
              <Route path="/pages" element={<PlaceholderPage title="Pages" />} />
              <Route path="/tables/basic" element={<BasicTablesPage />} />
              <Route
                path="/tables/data"
                element={<PlaceholderPage title="Data Tables" />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
