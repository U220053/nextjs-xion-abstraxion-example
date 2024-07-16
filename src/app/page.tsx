// "use client";
// import { useEffect, useState } from "react";
// import {
//   Abstraxion,
//   useAbstraxionAccount,
//   useModal,
// } from "@burnt-labs/abstraxion";
// import { Button } from "@burnt-labs/ui";
// import Image from "next/image";
// import img from "./assets/hero.jpeg";

// import puzzle from "./assets/Puzzle.svg";
// import owner from "./assets/Users.svg";
// import usdc from "./assets/USDC.svg";

// export default function Page(): JSX.Element {
//   // Abstraxion hooks
//   const { data: account } = useAbstraxionAccount();

//   // General state hooks
//   const [showAbstraxion, setShowAbstraxion] = useModal();
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // Update the isConnected state whenever the account changes
//     setIsConnected(account?.bech32Address !== "");
//   }, [account]);
//   console.log("isConnected", isConnected);
//   console.log("account", account);

//   return (
//     <div className="mb-40">
//       <main className=" top-0 right-0 m-4 flex flex-col items-end gap-4 p-4">
//         {/* <h1 className="text-2xl font-bold tracking-tighter text-black dark:text-white">
//         ABSTRAXION
//       </h1> */}
//         <div className="text-blue-500">
//           <Button
//             fullWidth
//             onClick={() => {
//               setShowAbstraxion(true);
//             }}
//             structure="base"
//             // theme="secondary"
//             style={{
//               backgroundColor: "#2253FF",
//             }}
//           >
//             {isConnected ? (
//               <div className="0 flex items-center justify-center">
//                 VIEW ACCOUNT
//               </div>
//             ) : (
//               "CONNECT"
//             )}
//           </Button>
//         </div>
//         <div className="flex flex-col md:flex-row items-center justify-between max-sm:px-5">
//           <div className="md:mr-8 md:ml-8  flex-shrink-0">
//             <Image src={img} width={600} height={675} alt="home" />
//           </div>
//           <div className="mt-4 flex-grow md:mr-8">
//             <div
//               className="text-3xl md:text-4xl font-bold title-text mt-4 md:mt-[2rem]"
//               style={{ color: "#2253FF" }}
//             >
//               Cliffton-INHP1001
//             </div>
//             <div>
//               <p className="text-white font-medium mt-4">
//                 The Cliffton Valley 3BHK Condo is a luxurious property located
//                 in Shimla, Himachal Pradesh. With stunning mountain views and
//                 modern amenities, this high-end holiday home offers a unique
//                 investment opportunity. Own a fraction of this premium property
//                 and earn rental income while benefiting from potential
//                 appreciation. Invest in Cliffton Valley with FractIt.
//               </p>

//               <div className="text-white mt-4">
//                 <p>
//                   <span className="font-bold " style={{ color: "#2253FF" }}>
//                     Property Type:
//                   </span>{" "}
//                   Holiday Home
//                 </p>
//                 <p>
//                   <span className="font-bold " style={{ color: "#2253FF" }}>
//                     Condominium Bedrooms/Bathrooms:
//                   </span>{" "}
//                   3 Bed / 3 Bath
//                 </p>
//                 <p>
//                   <span className="font-bold " style={{ color: "#2253FF" }}>
//                     Estimated APY:
//                   </span>{" "}
//                   18.1% (6.38% rental yield + 11.7% appreciation)
//                 </p>
//                 <p>
//                   <span className="font-bold " style={{ color: "#2253FF" }}>
//                     Fractible (Token) Price:
//                   </span>{" "}
//                   $1000 (USDC)
//                 </p>
//                 <p>
//                   <span className="font-bold " style={{ color: "#2253FF" }}>
//                     Estimated Return per Fractible:
//                   </span>{" "}
//                   $181/year
//                 </p>
//                 <p>
//                   <span className="font-bold " style={{ color: "#2253FF" }}>
//                     Max Allocation:
//                   </span>{" "}
//                   25 Fractibles/Wallet
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <span className="text-white text-xl md:text-4xl mt-4 body-text">
//                 235/235 Minted
//               </span>
//             </div>
//             <div className="flex gap-x-2 lg:gap-x-4">
//               {/* <div className="mt-4  flex flex-row gap-x-2">
//               <input
//                 type="text"
//                 placeholder="Enter Amount"
//                 disabled
//                 className="w-full md:w-[15rem] text-lg font-medium font-Montechmed mt-4 md:mt-[2rem] px-4 py-2 text-center flex flex-row border items-center justify-center place-items-center gap-x-2 bg-white"
//                 style={{ color: "#2253FF" }}
//               />
//               <button
//                 className={`w-full md:w-[15rem] text-white text-lg font-bold title-text mt-4 md:mt-[2rem] px-4 py-2 cursor-not-allowed`}
//                 disabled
//                 style={{
//                   backgroundColor: "#2253FF",
//                 }}
//               >
//                 MINT
//               </button>
//             </div> */}
//               {isConnected ? (
//                 <div className="mt-4 flex flex-row gap-x-2">
//                   <input
//                     type="text"
//                     placeholder="Enter Amount"
//                     className="w-full md:w-[15rem] text-lg font-medium font-Montechmed mt-4 md:mt-[1rem] px-4 py-2 text-center flex flex-row border items-center justify-center place-items-center gap-x-2 bg-white"
//                     style={{ color: "#2253FF" }}
//                   />
//                   <button
//                     className={`w-full md:w-[15rem] text-white text-lg font-bold title-text mt-4 md:mt-[1rem] px-4 py-2 `}
//                     style={{
//                       backgroundColor: "#2253FF",
//                     }}
//                   >
//                     MINT
//                   </button>
//                 </div>
//               ) : (
//                 <Button
//                   // fullWidth
//                   className={`w-full md:w-[15rem] text-white text-lg font-bold title-text mt-4 md:mt-[2rem] px-4 py-2 `}
//                   onClick={() => {
//                     setShowAbstraxion(true);
//                   }}
//                   structure="base"
//                   // theme="secondary"
//                   style={{
//                     backgroundColor: "#2253FF",
//                   }}
//                 >
//                   CONNECT
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         <Abstraxion
//           onClose={() => {
//             setShowAbstraxion(false);
//           }}
//         />
//       </main>
//       <div
//         className=" pb-4 mx-10 md:mx-28 items-center justify-center mt-[1rem] flex flex-col md:flex-row border border-white gap-x-4 gradient-bg font-bold"
//         style={{ color: "#2253FF" }}
//       >
//         <span className=" text-xl mt-4 body-text flex flex-col items-center">
//           <div className="flex flex-row">
//             <Image
//               src={puzzle}
//               alt="puzzle"
//               height={30}
//               width={30}
//               className="mr-2 mt-[-0.5rem]"
//             />
//             235
//           </div>
//           <div>Total Fractibles</div>
//         </span>
//         <span className=" text-xl mt-4 body-text flex flex-col items-center">
//           <div className="flex flex-row">
//             <Image
//               src={owner}
//               alt="puzzle"
//               height={30}
//               width={30}
//               className="mr-2"
//             />
//             17
//           </div>
//           <div>Total Owners</div>
//         </span>
//         <span className=" text-xl mt-4 body-text flex flex-col items-center">
//           <div className="flex flex-row">
//             <Image
//               src={usdc}
//               alt="puzzle"
//               height={30}
//               width={30}
//               className="mr-2 "
//             />
//             1000
//           </div>
//           <div>Floor Price (USDC)</div>
//         </span>
//         <span className=" text-xl mt-4 body-text flex flex-col items-center">
//           <div className="flex flex-row">
//             <Image
//               src={usdc}
//               alt="puzzle"
//               height={30}
//               width={30}
//               className="mr-2 "
//             />
//             235K
//           </div>
//           <div>Volume Traded (USDC)</div>
//         </span>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button, Input } from "@burnt-labs/ui";
import Image from "next/image";
import img from "./assets/hero.jpeg";
import puzzle from "./assets/Puzzle.svg";
import owner from "./assets/Users.svg";
import usdc from "./assets/USDC.svg";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";

const mintContractAddress =
  "xion15fqknspn6pcepxht2ar89e728m335f5x57u2zhtrhndv86zd36sq20n9ev"; // Replace with your contract address

type ExecuteResultOrUndefined = ExecuteResult | undefined;

export default function Page(): JSX.Element {
  // Abstraxion hooks
  const { data: account } = useAbstraxionAccount();
  const { client, logout } = useAbstraxionSigningClient();

  // General state hooks
  const [showAbstraxion, setShowAbstraxion] = useModal();
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [executeResult, setExecuteResult] =
    useState<ExecuteResultOrUndefined>(undefined);
  const [mintAmount, setMintAmount] = useState<string>("");

  useEffect(() => {
    // Update the isConnected state whenever the account changes
    setIsConnected(account?.bech32Address !== "");
  }, [account]);

  async function handleMint(): Promise<void> {
    if (!mintAmount) return;

    setLoading(true);

    // Log the addresses and mint amount
    console.log("Mint Contract Address:", mintContractAddress);
    console.log("User Address:", account?.bech32Address);
    console.log("Mint Amount:", mintAmount);

    const msg = {
      mint: {},
    };
    // Set the fee in the correct denomination
    const fee = {
      amount: [{ amount: "0", denom: "uxion" }], // Adjust the amount as needed
      gas: "500000",
    };

    try {
      const mintRes = await client?.execute(
        account.bech32Address,
        mintContractAddress,
        msg,
        fee,
        "",
        [
          {
            denom:
              "ibc/57097251ED81A232CE3C9D899E7C8096D6D87EF84BA203E12E424AA4C9B57A64", // Replace "usdc" with the correct denom if different
            amount: mintAmount.toString(),
          },
        ]
      );
      setExecuteResult(mintRes);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-40">
      <main className=" top-0 right-0 m-4 flex flex-col items-end gap-4 p-4">
        <div className="text-blue-500">
          <Button
            fullWidth
            onClick={() => {
              setShowAbstraxion(true);
            }}
            structure="base"
            style={{
              backgroundColor: "#2253FF",
            }}
          >
            {isConnected ? (
              <div className="0 flex items-center justify-center">
                VIEW ACCOUNT
              </div>
            ) : (
              "CONNECT"
            )}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between max-sm:px-5">
          <div className="md:mr-8 md:ml-8  flex-shrink-0">
            <Image src={img} width={600} height={675} alt="home" />
          </div>
          <div className="mt-4 flex-grow md:mr-8">
            <div
              className="text-3xl md:text-4xl font-bold title-text mt-4 md:mt-[2rem]"
              style={{ color: "#2253FF" }}
            >
              Cliffton-INHP1001
            </div>
            <div>
              <p className="text-white font-medium mt-4">
                The Cliffton Valley 3BHK Condo is a luxurious property located
                in Shimla, Himachal Pradesh. With stunning mountain views and
                modern amenities, this high-end holiday home offers a unique
                investment opportunity. Own a fraction of this premium property
                and earn rental income while benefiting from potential
                appreciation. Invest in Cliffton Valley with FractIt.
              </p>

              <div className="text-white mt-4">
                <p>
                  <span className="font-bold " style={{ color: "#2253FF" }}>
                    Property Type:
                  </span>{" "}
                  Holiday Home
                </p>
                <p>
                  <span className="font-bold " style={{ color: "#2253FF" }}>
                    Condominium Bedrooms/Bathrooms:
                  </span>{" "}
                  3 Bed / 3 Bath
                </p>
                <p>
                  <span className="font-bold " style={{ color: "#2253FF" }}>
                    Estimated APY:
                  </span>{" "}
                  18.1% (6.38% rental yield + 11.7% appreciation)
                </p>
                <p>
                  <span className="font-bold " style={{ color: "#2253FF" }}>
                    Fractible (Token) Price:
                  </span>{" "}
                  $1000 (USDC)
                </p>
                <p>
                  <span className="font-bold " style={{ color: "#2253FF" }}>
                    Estimated Return per Fractible:
                  </span>{" "}
                  $181/year
                </p>
                <p>
                  <span className="font-bold " style={{ color: "#2253FF" }}>
                    Max Allocation:
                  </span>{" "}
                  25 Fractibles/Wallet
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-white text-xl md:text-4xl mt-4 body-text">
                235/235 Minted
              </span>
            </div>
            <div className="flex gap-x-2 lg:gap-x-4">
              {isConnected ? (
                <div className="mt-4 flex flex-row gap-x-2">
                  <Input
                    type="text"
                    placeholder="Enter Amount"
                    className="w-full md:w-[15rem] text-lg text-black font-medium font-Montechmed mt-4 md:mt-[1rem] px-4 py-2 text-center flex flex-row border items-center justify-center place-items-center gap-x-2 "
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    style={{ color: "#2253FF" }}
                  />
                  <Button
                    className={`w-full md:w-[15rem] text-white text-lg font-bold title-text mt-4 md:mt-[1rem] px-4 py-2`}
                    style={{
                      backgroundColor: "#2253FF",
                    }}
                    onClick={handleMint}
                    disabled={loading}
                  >
                    {loading ? "LOADING..." : "MINT"}
                  </Button>
                </div>
              ) : (
                <Button
                  className={`w-full md:w-[15rem] text-white text-lg font-bold title-text mt-4 md:mt-[2rem] px-4 py-2`}
                  onClick={() => {
                    setShowAbstraxion(true);
                  }}
                  structure="base"
                  style={{
                    backgroundColor: "#2253FF",
                  }}
                >
                  CONNECT
                </Button>
              )}
            </div>
          </div>
        </div>

        <Abstraxion
          onClose={() => {
            setShowAbstraxion(false);
          }}
        />
      </main>
      <div
        className=" pb-4 mx-10 md:mx-28 items-center justify-center mt-[1rem] flex flex-col md:flex-row border border-white gap-x-4 gradient-bg font-bold"
        style={{ color: "#2253FF" }}
      >
        <span className=" text-xl mt-4 body-text flex flex-col items-center">
          <div className="flex flex-row">
            <Image
              src={puzzle}
              alt="puzzle"
              height={30}
              width={30}
              className="mr-2 mt-[-0.5rem]"
            />
            235
          </div>
          <div>Total Fractibles</div>
        </span>
        <span className=" text-xl mt-4 body-text flex flex-col items-center">
          <div className="flex flex-row">
            <Image
              src={owner}
              alt="puzzle"
              height={30}
              width={30}
              className="mr-2"
            />
            17
          </div>
          <div>Total Owners</div>
        </span>
        <span className=" text-xl mt-4 body-text flex flex-col items-center">
          <div className="flex flex-row">
            <Image
              src={usdc}
              alt="puzzle"
              height={30}
              width={30}
              className="mr-2 "
            />
            1000
          </div>
          <div>Floor Price (USDC)</div>
        </span>
      </div>
    </div>
  );
}
