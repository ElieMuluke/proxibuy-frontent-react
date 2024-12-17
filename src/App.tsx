import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "./components/core/Layouts/LandingLayout";
import HomePage from "./pages/landing/Landingpage";
import PolitiqueDeConfidentialite from "./pages/landing/PolitiqueDeConfidentialite";
import TermesEtConditions from "./pages/landing/TermesEtConditions";
import AdminLayout from "./components/core/Layouts/AdminLayout";
import Dashboard from "./pages/admin/page";
import Utilisateurs from "./pages/admin/administrateurs/page";
import Boutiques from "./pages/admin/boutiques/page";
import MailPage from "./pages/admin/messaging/page";
import Parrainage from "./pages/admin/parrainage/page";
import SettingsAccountPage from "./pages/common/settings/page";
import SettingsLayout from "./components/core/Layouts/AdminSettingsLayout";
import AuthLayout from "./components/core/Layouts/AuthLayout";
import LoginPage from "./pages/auth/login/page";
import RegisterPage from "./pages/auth/register/page";
import ActivateUser from "./pages/auth/activate-account/page";
import ForgotPassword from "./pages/auth/forgot-password/page";
import ResetPassword from "./pages/auth/reset-password/page";
import VerifyOTP from "./pages/auth/verify-otp/page";
import SystemConfigurationPage from "./pages/common/settings/configurations/page";
import { AccountForm } from "./pages/common/settings/account/accountForm";
import SettingsAppearancePage from "./pages/common/settings/appearance/page";
import SettingsNotificationsPage from "./pages/common/settings/notifications/page";
// import StoreLayout from "./components/core/Layouts/StoreLayout";
// import Products from "./pages/app/products/page";
// import ProductById from "./pages/app/products/[id]/page";
// import Cart from "./pages/app/cart/page";
// import RealEstate from "./pages/app/real-estate/page";
// import RealEstateById from "./pages/app/real-estate/[id]/page";
// import StoreById from "./pages/app/store/[id]/page";
// import CreateStore from "./pages/app/(vendeur)/create-shop/page";
// import ManageStores from "./pages/app/(vendeur)/manage-stores/page";
// import ManageStoreById from "./pages/app/(vendeur)/manage-stores/[id]/page";

function App() {
	return (
		<Router>
			<Routes>
				{/* Public routes */}
				<Route path='/' element={<LandingLayout />}>
					<Route index element={<HomePage />} />
					<Route
						path='politique-de-confidentialite'
						element={<PolitiqueDeConfidentialite />}
					/>
					<Route path='termes-et-conditions' element={<TermesEtConditions />} />
				</Route>

				{/* Authentication routes */}
				<Route path='/auth' element={<AuthLayout />}>
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='activate-account' element={<ActivateUser />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='reset-password' element={<ResetPassword />} />
					<Route path='verify-otp' element={<VerifyOTP />} />
				</Route>

				{/* Protected Admin routes */}
				<Route path='/admin' element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='administrateurs' element={<Utilisateurs />} />
					<Route path='boutiques' element={<Boutiques />} />
					<Route path='messaging' element={<MailPage />} />
					<Route path='parrainage' element={<Parrainage />} />
					<Route path='settings' element={<SettingsLayout />}>
						<Route index element={<SettingsAccountPage />} />
						<Route path='account' element={<AccountForm />} />
						<Route path='appearance' element={<SettingsAppearancePage />} />
						<Route
							path='configurations'
							element={<SystemConfigurationPage />}
						/>
						<Route
							path='notifications'
							element={<SettingsNotificationsPage />}
						/>
					</Route>
				</Route>

				{/* Protected Store routes */}
				{/* <Route path='/app' element={<StoreLayout />}>
					<Route index element={<Products />} />
					<Route path='products' element={<Products />} />
					<Route
						path='products/:id'
						element={
							<ProductById
								params={{
									id: "",
								}}
							/>
						}
					/>
					<Route path='cart' element={<Cart />} />
					<Route path='realestate' element={<RealEstate />} />
					<Route
						path='realestate/:id'
						element={
							<RealEstateById
								params={{
									id: "",
								}}
							/>
						}
					/>
					<Route path='messaging' element={<MailPage />} />
					<Route
						path='stores/:id'
						element={
							<StoreById
								params={{
									id: "",
								}}
							/>
						}
					/>
					<Route path='create-store' element={<CreateStore />} />
					<Route path='manage-stores' element={<ManageStores />} />
					<Route
						path='manage-stores/:id'
						element={
							<ManageStoreById
								params={{
									id: "",
								}}
							/>
						}
					/>
					<Route path='settings' element={<SettingsLayout />}>
					<Route index element={<SettingsAccountPage />} />
					<Route path='account' element={<AccountForm />} />
					<Route path='appearance' element={<SettingsAppearancePage />} />
					<Route path='configurations' element={<SystemConfigurationPage />} />
					<Route path='notifications' element={<SettingsNotificationsPage />} />
				</Route>
				</Route> */}
			</Routes>
		</Router>
	);
}

export default App;
