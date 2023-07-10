import { Client, Context } from '@verida/client-ts'
import { AutoAccount } from '@verida/account-node'
import { EnvironmentType, IContext, Web3CallType } from '@verida/types'

const VERIDA_ENVIRONMENT = EnvironmentType.TESTNET
const CONTEXT_NAME = 'PolygonID: dAppstore'
const CLICK_DB_NAME = 'clicks'

export interface Click {
    wallet: string,
    url?: string,
    insertedAt?: string
}

const DID_CLIENT_CONFIG = {
    callType: <Web3CallType> 'web3',
    web3Config: {
        rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/Q4NRuRlwTNyI90dDCgiX_KT_vS_2gpbN',
        privateKey: process.env.VERIDA_DID_PRIVATE_KEY,
    }
}

let veridaContext = <IContext | undefined> undefined

export const getVeridaContext = async function(): Promise<IContext | undefined> {
    if (veridaContext) {
        return veridaContext
    }

    // establish a network connection
    const client = new Client({
        environment: VERIDA_ENVIRONMENT
    })

    // create a Verida account instance that wraps the authorized Verida DID server connection
    // The `AutoAccount` instance will automatically sign any consent messages
    const account = new AutoAccount({
        privateKey: `0x${process.env.VERIDA_DID_PRIVATE_KEY}`,
        environment: VERIDA_ENVIRONMENT,
        didClientConfig: DID_CLIENT_CONFIG
    })

    // Connect the Verida account to the Verida client
    await client.connect(account)

    // Open an application context (forcing creation of a new context if it doesn't already exist)
    const context = await client.openContext(CONTEXT_NAME, true)
    if (context) {
        veridaContext = context
    }

    return veridaContext
}

export const getClickDb = async function() {
    const context = await getVeridaContext()
    return await context!.openDatabase(CLICK_DB_NAME)
}
