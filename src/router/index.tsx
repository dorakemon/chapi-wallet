import { Navigate, useRoutes } from "react-router-dom";

import { CredentialStore } from "@/pages/CredentialStore";
import { CredentialGet } from "@/pages/CredentialGet";
import { WalletWorker } from "@/pages/WalletWorker";
import { InstallWallet } from "@/pages/InstallWallet";

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/install-wallet", element: <InstallWallet /> },
    { path: "/get-credential", element: <CredentialGet /> },
    { path: "/store-credential", element: <CredentialStore /> },
    { path: "/wallet-worker", element: <WalletWorker /> },
    { path: "*", element: <Navigate to="/install-wallet" replace /> }
  ];

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
