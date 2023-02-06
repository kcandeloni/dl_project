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
                <Route path="/about" element={<div></div>} />

                <Route
                  path="/page"
                  element={
                    <ProtectedRouteGuard>
                      <Header />
                    </ProtectedRouteGuard>
                  }
                >
                  <Route path="status" element={<div>Status</div>} />
                  <Route path="games" element={<div>Game</div>} />
                  <Route path="game/:gameId" element={<div>Game</div>} />
                  <Route path="avatars" element={<div></div>} />
                  <Route path="avatar/:avatarId" element={<div></div>} />
                  <Route path="stages" element={<div></div>} />
                  <Route path="stage/:stageId" element={<div></div>} />
                  <Route path="store" element={<div></div>} />
                  <Route path="store/:itemId" element={<div></div>} />
                  <Route path="enrollment" element={<div></div>} />
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
