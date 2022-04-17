import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import {
  convertFromMicroDenom,
  convertMicroDenomToDenom,
} from 'util/conversion'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

const PUBLIC_CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME
const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno'
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CW_721_METADATA_STARTER_ADDRESS || '';

const Nfts: NextPage = () => {
  return <div>All of your NFTs</div>
}

export default Nfts