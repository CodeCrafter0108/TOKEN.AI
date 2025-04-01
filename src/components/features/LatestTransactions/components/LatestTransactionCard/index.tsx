import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import { AppRoutes } from '@/constants/routes';
import { Flex } from '@/styles/global';
import { ISwap, IToken } from '@/types/common';
import { formatAddress, formatNumber } from '@/utils/formatters';
import { useRouter } from 'next/navigation';
import { formatEther } from 'viem';
import { cardData } from '../../constants';
import { TransactionType } from '../../types';
import { Card, Info, Title } from './styles';
// import BigNumber from 'bignumber.js';

interface LatestTransactionCardProps {
  isNewTransaction: boolean;
  transaction: ISwap | IToken;
}

export const LatestTransactionCard = ({ isNewTransaction, transaction }: LatestTransactionCardProps) => {
  const router = useRouter();

  const isLaunch = 'type' in transaction ? false : true;

  const launchTransaction = transaction as IToken;
  const swapTransaction = transaction as ISwap;
  const transactionType: TransactionType = isLaunch ? 'launch' : swapTransaction.type;
  const amountValue: string = !isLaunch
    ? ` $${formatNumber(+formatEther(BigInt((transaction as ISwap).amount)) * +(transaction as ISwap).price)}`
    : '';

  // const priceBaks = new BigNumber('999999685124816892582271066')
  //   .div(new BigNumber(10 ** 18))
  //   .div(new BigNumber('100000031565043923697636').div(new BigNumber(10 ** 18)))
  //   .multipliedBy(new BigNumber('0.00005384180702095185703854267598324135'));
  // console.log('🚀 ~ LatestTransactionCard ~ priceBaks:', priceBaks.toString());

  // const volumeBaks = new BigNumber('999999685124816892582271066').div(new BigNumber(10 ** 18)).multipliedBy(priceBaks);
  // console.log('🚀 ~ LatestTransactionCard ~ volumeBaks:', volumeBaks.toString());

  // const liquditi = volumeBaks.plus(
  //   new BigNumber('100000031565043923697636').div(new BigNumber(10 ** 18)).multipliedBy(new BigNumber('0.00005384180702095185703854267598324135'))
  // );
  // console.log('🚀 ~ LatestTransactionCard ~ liquditi:', liquditi.toString());

  // const N_18 = new BigNumber(10).pow(18);
  // const supply_decimal = new BigNumber('1000000000000000000000000000').div(N_18);

  // console.log(supply_decimal.multipliedBy(new BigNumber('0.00005597700637376758977638868518489195')).toString());

  // const ai_baks = new BigNumber('100000013166380238179116').div(new BigNumber('999999868743398481176143604')).toString();
  // //0.00010000002629204384
  // console.log("🚀 ~ LatestTransactionCard ~ ai_baks:", ai_baks)

  // const tanon_native = (new BigNumber('79228082654994775404605955116').div(new BigNumber(2).pow(96)).multipliedBy(new BigNumber('0.55')).toString());
  // //0.5499994456188700413715
  // console.log("🚀 ~ LatestTransactionCard ~ tanon_native:", tanon_native)

  // const tanon_baks = new BigNumber('79228083365815791714094411532').div(new BigNumber(2).pow(96)).multipliedBy(new BigNumber(tanon_native)).toString();
  // //0.54999889617279631739801207749466075623001
  // console.log("🚀 ~ LatestTransactionCard ~ tanon_baks:", tanon_baks)

  // const result_price = new BigNumber(ai_baks).multipliedBy(new BigNumber(tanon_baks)).toString();
  // //0.00001663745421355716969503520915408118371693807850660072130205131122642229856233608
  // console.log("🚀 ~ LatestTransactionCard ~ result:", result_price)

  // const price_on_trade_modal = new BigNumber('1').div(new BigNumber('17524')).toString();
  //  //0.0000570645971239443
  // console.log("🚀 ~ LatestTransactionCard ~ price_on_trade_modal:", price_on_trade_modal)

  // const test = new BigNumber('0.00000001').div('0.160805788789693502').toString();
  // console.log("🚀 ~ LatestTransactionCard ~ test:", test)

  return (
    <Card
      $isNew={isNewTransaction}
      $type={transactionType}
      role='link'
      onClick={() =>
        router.push(`${AppRoutes.TOKEN}/${isLaunch ? launchTransaction?.address : swapTransaction?.token?.address}`)
      }
    >
      <Flex $gap={8} $align='center'>
        <ImageWithFallback
          fill
          alt='Agent logo'
          src={isLaunch ? launchTransaction?.imageUrl : swapTransaction?.token?.imageUrl}
          loading='lazy'
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          sizes='100%'
          widthSkeleton={28}
          heightSkeleton={28}
        />
        <Flex $direction='column'>
          <Title>{isLaunch ? launchTransaction?.name : swapTransaction?.token?.name}</Title>
          <Info>
            <span>{formatAddress(isLaunch ? launchTransaction?.address : swapTransaction?.token?.address, 6, 4)}</span>
            <span
              style={{ color: cardData[transactionType].color }}
            >{`${cardData[transactionType].label}${amountValue}`}</span>
          </Info>
        </Flex>
      </Flex>
    </Card>
  );
};
