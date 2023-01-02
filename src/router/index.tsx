import { Navigate, useRoutes } from "react-router-dom";

import { CredentialGet } from "@/pages/CredentialGet";
import { CredentialStore } from "@/pages/CredentialStore";
import { InstallWallet } from "@/pages/InstallWallet";
import { WalletWorker } from "@/pages/WalletWorker";

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
