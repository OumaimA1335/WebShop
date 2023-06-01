import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/dashboard";
import MainLayout from "./Components/MainLayout";
import ProductList from "./pages/Product/ProductList";
import ProductAdd from "./pages/Product/ProductAdd";
import BrandList from "./pages/Brand/BrandList";
import SousCategoryList from "./pages/Category/CategoryList";
import ProductDetail from "./pages/Product/ProductDetail";
import Account from "./pages/Account";
import Notification from "./Components/notifications";
import AdminList from "./pages/Users/AdminList";
import UserList from "./pages/Users/UserList";
import SousCategoryAdd from "./pages/Category/CategoryAdd";
import SousCategoryDetail from "./pages/Category/CategoryDetail";
import BrandAdd from "./pages/Brand/BrandAdd";
import BrandDetail from "./pages/Brand/BrandDetail";
import AdminAdd from "./pages/Users/AdminAdd";
import OfferList from "./pages/Offre/OfferList";
import OfferAdd from "./pages/Offre/OfferAdd";
import OfferDetail from "./pages/Offre/OfferDetail";
import CommandeList from "./pages/Commande/CommandeList";
import ReclamationList from "./pages/reclamation/ReclamationList";
import Facture from "./pages/Commande/Facture";
import PartenaireList from "./pages/Partenaire/PartenaireList";
import PartenaireAdd from "./pages/Partenaire/PartenaireAdd";
import PartenaireDetail from "./pages/Partenaire/PartenaireDetail";
import { useState,useEffect } from "react";
function App() {
  const user = localStorage.getItem("user");
  const logged = localStorage.getItem("logged");
  //const role = localStorage.getItem("role_id");
  const [role, setRole] = useState(localStorage.getItem("role_id"));

  useEffect(() => {
    setRole(localStorage.getItem("role_id"));
  }, [localStorage.getItem("role_id")]);
  console.log(role);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {logged &&( 
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="compte" element={<Account />} />
            <Route path="liste-produit" element={<ProductList />} />
            <Route
              path="liste-produit/ajouter-produit/:id"
              element={<ProductAdd />}
            />
            <Route
              path="liste-produit/detail-produit/:id"
              element={<ProductDetail />}
            />
            <Route path="liste-marque" element={<BrandList />} />
            <Route path="liste-marque/ajouter-marque" element={<BrandAdd />} />
            <Route
              path="liste-marque/modifier-marque/:id"
              element={<BrandDetail />}
            />
            <Route path="liste-categorie" element={<SousCategoryList />} />
            <Route
              path="liste-categorie/ajouter-categorie"
              element={<SousCategoryAdd />}
            />
            <Route
              path="liste-categorie/modifier-categorie/:id"
              element={<SousCategoryDetail />}
            />
            {role && role == 1 &&(
              <>
               <Route path="liste-admin" element={<AdminList />} />
            <Route
              path="liste-admin/ajouter-sousAdmin"
              element={<AdminAdd />}
            />
            <Route path="liste-utilisateurs" element={<UserList />} />
            <Route path="liste-commande" element={<CommandeList />} />
            <Route path="liste-commande/facture/:id" element={<Facture />} />
              </>
           
            )}
            <Route path="liste-offre" element={<OfferList />} />
            <Route path="liste-offre/ajouter-offre" element={<OfferAdd />} />
            <Route
              path="liste-offre/modifier-offre/:id"
              element={<OfferDetail />}
            />
           
            <Route path="liste-reclamation" element={<ReclamationList />} />
           
            <Route path="liste-partenaire" element={<PartenaireList />} />
            <Route
              path="liste-partenaire/ajouter-partenaire"
              element={<PartenaireAdd />}
            />
            <Route
              path="liste-partenaire/modifier-partenaire/:id"
              element={<PartenaireDetail />}
            />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
