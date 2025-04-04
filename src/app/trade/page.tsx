import { PageTitle } from '@/components/features/PageTitle';
import { PageWrapper } from '@/components/features/PageWrapper';
import { TradeForm } from '../../components/features/TradeForm';
import { TradeFormWrapper } from './components/TradeFormWrapper';
import { ITokensData } from '@/types/common';
import { GetAgents } from '@/graphql/queries/GetAgents';
import { getInitialData } from '@/services/getInitialData';

export default async function Trade() {
  const initialData: ITokensData | undefined = await getInitialData<ITokensData>({
    query: GetAgents,
    variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 500 }
  });

  return (
    <PageWrapper hasPaddingTop>
      <PageTitle title='Trade' subTitle='Easily trade your tokens' />
      <TradeFormWrapper>
        <TradeForm initialData={initialData} />
      </TradeFormWrapper>
    </PageWrapper>
  );
}
