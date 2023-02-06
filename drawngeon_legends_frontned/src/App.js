import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";

import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContex";

import useToken from "./hooks/useToken";

import { Home } from "./pages/Home";
import Header from "./components/Header/Header";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home currentPage={"signIn"} />} />
                <Route path="/sign-up" element={<Home currentPage={"signUp"} />} />

                <Route
                  path="/page"
                  element={
                    <ProtectedRouteGuard>
                      <Header />
                    </ProtectedRouteGuard>
                  }
                >
                  <Route path="status" element={<div>Status</div>} />
                  <Route path="game" element={<div>Game</div>} />
                  <Route path="avatar" element={<div></div>} />
                  <Route path="stage" element={<div></div>} />
                  <Route path="store" element={<div></div>} />
                  <Route index path="*" element={<Navigate to="/page/status" />} />
                </Route>
              </Routes>
            </Router>
          </ ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
