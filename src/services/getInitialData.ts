import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { OperationVariables, TypedDocumentNode } from '@apollo/client';

interface GetInitialDataProps<T> {
  query: TypedDocumentNode<T, OperationVariables>;
  variables?: OperationVariables;
}

export const getInitialData = async <T>({ query, variables }: GetInitialDataProps<T>): Promise<T | undefined> => {
  const client = getGraphClient(ChainId.SONIC);

  try {
    const { data: initialData } = await client.query<T>({
      query,
      variables
    });

    return initialData;
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return undefined;
  }
};
