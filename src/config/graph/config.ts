import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ChainId } from '@/constants/blockchain/networks';

export const LAUNCHPAD_GRAPH: Record<number, string> = {
    [ChainId.SONIC]: 'https://api.studio.thegraph.com/query/104145/token-ai/version/latest',
    // [ChainId.SONIC]: 'http://localhost:8000/subgraphs/name/ai-token-launchpad'
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