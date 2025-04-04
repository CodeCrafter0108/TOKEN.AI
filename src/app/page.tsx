import { HomeContent } from '@/components/features/HomeContent';
import { PageWrapper } from '@/components/features/PageWrapper';
import { GetAgentsGroup } from '@/graphql/queries/GetAgentsGroup';
import { getInitialData } from '@/services/getInitialData';
import { ITokensGroupData } from '@/types/common';

export default async function Home() {
  const initialData: ITokensGroupData | undefined = await getInitialData<ITokensGroupData>({ query: GetAgentsGroup });

  return (
    <PageWrapper hasPaddingTop>
      <HomeContent initialData={initialData} />
    </PageWrapper>
  );
}
