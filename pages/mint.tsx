import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import {
  convertFromMicroDenom,
  convertMicroDenomToDenom,
} from 'util/conversion'

const PUBLIC_CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME
const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno'

const Mint: NextPage = () => {
  const { walletAddress, signingClient } = useSigningClient()
  const [balance, setBalance] = useState('')
  const [loadedAt, setLoadedAt] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [tokenUri, setTokenUri] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [animationUrl, setAnimationUrl] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('')
  const [description, setDescription] = useState('')
  const [externalUrl, setExternalUrl] = useState('')
  const [image, setImage] = useState<File>();
  const [imageData, setImageData] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    setError('')
    setSuccess('')

    signingClient
      .getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      .then((response: any) => {
        const { amount, denom }: { amount: number; denom: string } = response
        setBalance(
          `${convertMicroDenomToDenom(amount)} ${convertFromMicroDenom(denom)}`,
        )
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('Error signingClient.getBalance(): ', error)
      })
  }, [signingClient, walletAddress, loadedAt])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    console.log(fileList)

    if (!fileList) return;

    setImage(fileList[0]);
  }



  const handleMint = (event: MouseEvent<HTMLElement>) => {}

  return (
    <WalletLoader loading={loading}>
      <p className="text-2xl">Your wallet has {balance}</p>

      <h1 className="text-5xl font-bold my-8">
        Mint an NFT (with metadata stored on chain)
      </h1>
      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <input
            required
            type="text"
            id="token-uri"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            placeholder={`Token URI ...`}
            onChange={(event) => setTokenUri(event.target.value)}
            value={tokenUri}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            id="youtube-url"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            placeholder={`Youtube URL(Optional) ...`}
            onChange={(event) => setYoutubeUrl(event.target.value)}
            value={youtubeUrl}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            id="animation-url"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            placeholder={`Animation URL(Optional) ...`}
            onChange={(event) => setAnimationUrl(event.target.value)}
            value={animationUrl}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            id="background-color"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            placeholder={`Background color(Optional) ...`}
            onChange={(event) => setBackgroundColor(event.target.value)}
            value={backgroundColor}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <textarea
            id="description"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg h-64"
            placeholder={`Description(Optional) ...`}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            id="external-url"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            placeholder={`External URL(Optional) ...`}
            onChange={(event) => setExternalUrl(event.target.value)}
            value={externalUrl}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <label 
            htmlFor="image"
            className="font-mono text-lg"
          >
            Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            onChange={handleImageChange}
          />


        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            id="image-data"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            placeholder={`Image Data(Optional) ...`}
            onChange={(event) => setImageData(event.target.value)}
            value={imageData}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            id="name"
            className="input input-bordered focus:input-primary input-lg rounded-xl flex-grow font-mono text-lg"
            placeholder={`Name(Optional) ...`}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </div>
      </div>



      <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
        <button
          className="mt-4 md:mt-0 btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl rounded-full flex-grow"
          onClick={handleMint}
        >
          MINT
        </button>
      </div>
    </WalletLoader>
  )
}

export default Mint