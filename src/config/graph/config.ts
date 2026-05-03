import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ChainId } from '@/constants/blockchain/networks';

const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;

if (!GRAPH_URL) {
    throw new Error('GRAPH_URL is not defined');
}

export const LAUNCHPAD_GRAPH: Record<number, string> = {
    [ChainId.SONIC]: GRAPH_URL,
};

export const getGraphClient = (chainId: ChainId) => {
    const uri = LAUNCHPAD_GRAPH[chainId];

    return new ApolloClient({
        uri,
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
                errorPolicy: 'all',
            },
            query: {
                fetchPolicy: 'network-only',
                errorPolicy: 'all',
            },
        },
    });
};