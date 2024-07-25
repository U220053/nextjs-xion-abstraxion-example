"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load contract address from environment variables
  const mintContractAddress = process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS;
  const ibcDenom = process.env.NEXT_PUBLIC_IBC_DENOM;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AbstraxionProvider
          config={{
            contracts: [
              {
                address: mintContractAddress || "",
                amounts: [{ denom: "uxion", amount: "1000000" }],
              },
            ],
          }}
        >
          {children}
        </AbstraxionProvider>
      </body>
    </html>
  );
}
