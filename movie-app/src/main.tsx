import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

// Der gesamte App-Baum wird hier in den Redux-Provider
// eingebettet, welcher den Store zur Verfügung stellt.
// Somit können alle Komponenten in der App auf den Store
// zugreifen, z.B. mittels useSelector oder useDispatch.

// Zusätzlich wird der BrowserRouter um die App gelegt,
// damit wir in der gesamten App Routing-Funktionalität
// nutzen können.

// Man kann hier auch noch weitere Provider einfügen,
// z.B. für Theme-Management, Internationalisierung, etc.

// Man muss nicht unbedingt alle Provider hier in main.tsx
// einfügen, aber es ist eine gängige Praxis, da so
// die gesamte App von diesen Kontexten profitieren kann.

// An sich müssen Provider nur um die Komponenten gelegt
// werden, die sie benötigen, z.B. wenn nur ein Teil der App
// bspw. auf den Redux-Store zugreifen muss, aber das sieht man
// eher selten in der Praxis.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
