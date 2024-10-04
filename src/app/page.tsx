"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button, Input } from "@burnt-labs/ui";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { coins } from "@cosmjs/proto-signing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/fractitilogo.png";
import hero from "./assets/imghero.png";
import img1 from "./assets/img.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";

// Environment variables
const nftContractAddress =
  "xion13cllmxz3npueh3krl0rfqlvgs8gcjzz2rek6da760mhcgmdwfs2qtsddc8";
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
  const [usdcBalance, setUsdcBalance] = useState<string>("0");
  const [mintNft, setMintNft] = useState<ExecuteResult | undefined>(undefined);

  useEffect(() => {
    console.log("Account:", account);
    if (account && account.bech32Address != "") {
      setIsConnected(true);
      checkUsdcBalance();
      handleNumTokens();
    } else {
      setIsConnected(false);
      setUsdcBalance("0");
    }
  }, [account]);

  const checkUsdcBalance = async () => {
    if (client && account) {
      try {
        const balance = await client.getBalance(
          account.bech32Address,
          // feeDenom
          ibcDenom
        );

        let balanceAmount = Number(balance.amount) / 1000000;
        setUsdcBalance(balanceAmount.toFixed(2));
      } catch (error) {
        console.error("Error fetching USDC balance:", error);
      }
    }
  };
  const handleNumTokens = async () => {
    try {
      if (!client || !account) {
        throw new Error("Wallet not connected");
      }

      const queryMsg = { num_tokens: {} };
      console.log("Query Message:", queryMsg);

      const queryRes = await client.queryContractSmart(
        nftContractAddress,
        queryMsg
      );
      console.log("Query Result:", queryRes);

      // Assuming the response has a 'count' field
      setMintNft(queryRes.count);
    } catch (error) {
      console.error("Query error:", error);
    }
  };

  const handleMint = async (): Promise<void> => {
    setLoading(true);

    try {
      if (!client || !account) {
        throw new Error("Wallet not connected");
      }

      console.log("Wallet Address:", account.bech32Address);

      const mintMsg = { deposit: {} };
      const fee = {
        amount: coins(feeAmount, feeDenom),
        gas: gasLimit,
      };

      console.log("Mint Message:", mintMsg);
      console.log("Fee:", fee);

      const mintRes = await client.execute(
        account.bech32Address,
        mintContractAddress,
        mintMsg,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
        },
        "",

        coins(100, ibcDenom)
      );

      console.log("Mint Result:", mintRes);

      setExecuteResult(mintRes);
      toast.success("Token minted successfully!");
      checkUsdcBalance();
    } catch (error) {
      console.error("Minting error:", error);
      toast.error(`Minting failed`);
    } finally {
      setLoading(false);
    }
  };

  console.log("mintNft", mintNft);
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
              alt={`Dubai Apartment Image 2`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img2}
              alt={`Dubai Apartment Image 3`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img3}
              alt={`Dubai Apartment Image 4`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img4}
              alt={`Dubai Apartment Image 5`}
              width={200}
              height={150}
              className="rounded"
            />
            <Image
              src={img5}
              alt={`Dubai Apartment Image 6`}
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
            {/* <label className="block text-sm font-medium text-gray-700 mb-2">
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
            )} */}
            <div className="flex justify-between mt-2 ">
              <span style={{ color: "#3b82f6" }} className="font-bold">
                {usdcBalance} USDC
              </span>

              <span>
                {" "}
                {mintNft !== undefined ? mintNft.toString() : "0"}/500 Minted
              </span>
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
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Home;
