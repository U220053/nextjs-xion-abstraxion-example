"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button, Input } from "@burnt-labs/ui";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import logo from "./assets/fractitilogo.png";
import hero from "./assets/imghero.png";
import img1 from "./assets/img.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";

// Environment variables
const mintContractAddress = process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS ?? "";
const feeAmount = process.env.NEXT_PUBLIC_FEE_AMOUNT || "0";
const feeDenom = process.env.NEXT_PUBLIC_FEE_DENOM || "uxion";
const gasLimit = process.env.NEXT_PUBLIC_GAS_LIMIT || "500000";
const ibcDenom = process.env.NEXT_PUBLIC_IBC_DENOM ?? "";

type ExecuteResultOrUndefined = ExecuteResult | undefined;

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center bg-blue-100 rounded-md p-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-2xl font-bold"
        >
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && <div className="mt-2">{children}</div>}
    </div>
  );
};

const Home: React.FC = () => {
  const { data: account } = useAbstraxionAccount();
  const { client, logout } = useAbstraxionSigningClient();
  const [showAbstraxion, setShowAbstraxion] = useModal();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [executeResult, setExecuteResult] =
    useState<ExecuteResultOrUndefined>(undefined);
  const [mintAmount, setMintAmount] = useState<string>("");

  useEffect(() => {
    setIsConnected(!!account?.bech32Address);
  }, [account]);

  const handleMint = async (): Promise<void> => {
    if (!mintAmount) return;

    setLoading(true);

    console.log("Mint Contract Address:", mintContractAddress);
    console.log("User Address:", account?.bech32Address);
    console.log("Mint Amount:", mintAmount);

    const msg = { mint: {} };
    const fee = {
      amount: [{ amount: feeAmount, denom: feeDenom }],
      gas: gasLimit,
    };

    try {
      if (client && account) {
        const mintRes = await client.execute(
          account.bech32Address,
          mintContractAddress,
          msg,
          fee,
          "",
          [{ denom: ibcDenom, amount: mintAmount }]
        );
        setExecuteResult(mintRes);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 burnt-bg text-black">
      <header className="flex justify-between items-center mb-8">
        <Image src={logo} alt="Fractit Logo" width={100} height={30} />
        <Button
          onClick={() => setShowAbstraxion(true)}
          style={{ backgroundColor: "#3b82f6", color: "white" }}
          className="text-white px-4 py-2 rounded"
        >
          {isConnected ? "VIEW ACCOUNT" : "CONNECT WALLET"}
        </Button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={hero}
            alt="Dubai Apartment"
            width={700}
            height={400}
            className="rounded-lg mb-4 custom-image"
          />
          <div className="grid grid-cols-3 gap-2">
            <Image
              src={img6}
              alt={`Dubai Apartment Image 1`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img1}
              alt={`Dubai Apartment Image 1`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img2}
              alt={`Dubai Apartment Image 1`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img3}
              alt={`Dubai Apartment Image 1`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img4}
              alt={`Dubai Apartment Image 1`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img5}
              alt={`Dubai Apartment Image 1`}
              width={200}
              height={150}
              className="rounded"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">Dubai Apartment</h1>
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Sale Ends In</p>
            <div className="flex space-x-10">
              {["Days", "hours", "minutes", "seconds"].map((unit, i) => (
                <div key={unit} className="text-center">
                  <div className="text-2xl font-bold">
                    {[21, 11, 35, 24][i]}
                  </div>
                  <div className="text-sm text-gray-500">{unit}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            {isConnected ? (
              <input
                type="text"
                placeholder="Enter Amount"
                className="w-full text-black border rounded p-2"
                value={mintAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMintAmount(e.target.value)
                }
              />
            ) : (
              <input
                type="number"
                className="w-full text-black border rounded p-2 cursor-not-allowed"
                disabled
              />
            )}
            <div className="flex justify-between mt-2 ">
              <span style={{ color: "#3b82f6" }} className="font-bold">
                9.52 USDC
              </span>
              <span>235/500 Minted</span>
            </div>
          </div>

          {isConnected ? (
            <Button
              style={{ backgroundColor: "#3b82f6", color: "white" }}
              className="w-full bg-blue-500 text-white py-3 rounded font-semibold"
              onClick={handleMint}
              disabled={loading}
            >
              {loading ? "MINTING..." : "MINT NOW"}
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#3b82f6", color: "white" }}
              className="w-full bg-blue-500 text-white py-3 rounded font-semibold"
              onClick={() => setShowAbstraxion(true)}
            >
              CONNECT WALLET
            </Button>
          )}

          <ExpandableSection title="Description">
            <p className="text-gray-600">
              Tattooed Kitty Gang ("TKG") is a collection of 666 badass kitty
              gangsters, with symbol of tattoos, living in the Proud Kitty Gang
              ("PKG") metaverse. Each TKG is an 1/1 ID as gangster member & all
              the joint rights.
            </p>
          </ExpandableSection>

          <ExpandableSection title="Details">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Lot area (sqft):", "480 sqft"],
                ["Home area (sqft):", "350 sqft"],
                ["Lot dimensions:", "100x35"],
                ["Rooms:", "8"],
                ["Beds:", "4"],
                ["Baths:", "2"],
                ["Garages:", "1"],
                ["Price ($):", "$3500"],
                ["Year built:", "1998"],
                ["Status:", "For Sale"],
              ].map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium">{key}</span> {value}
                </div>
              ))}
            </div>
          </ExpandableSection>

          <ExpandableSection title="FAQs">
            <div className="grid grid-cols-1 gap-4">
              {[
                ["Is the property furnished?", "Yes"],
                ["Is the property pet-friendly?", "No"],
                ["Is the property smoke-free?", "Yes"],
                ["Is the property wheelchair accessible?", "No"],
              ].map(([question, answer]) => (
                <div key={question}>
                  <span className="font-medium">{question}</span>
                  <br />
                  {answer}
                </div>
              ))}
            </div>
          </ExpandableSection>
        </div>
      </main>

      <Abstraxion
        onClose={() => {
          setShowAbstraxion(false);
        }}
      />
    </div>
  );
};

export default Home;
