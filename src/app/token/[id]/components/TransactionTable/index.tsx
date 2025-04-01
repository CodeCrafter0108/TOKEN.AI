import ExternalLinkIcon from '@/assets/icons/externalLink.svg';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import SortSelector from '@/components/shared/SortSelector';
import { SortType } from '@/components/shared/SortSelector/types';
import { ExternalLinks } from '@/constants/routes';
import { useTableSort } from '@/hooks/useTableSort';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { Box, Flex } from '@/styles/global';
import { ISwap } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { formatAddress, formatNumber, formatTimeAgo } from '@/utils/formatters';
import { memo, useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { TableBody, TableHead, TableItem, TableTitle, TableWrapper, Text, Title } from './styles';

interface TransactionTableProps {
  data?: ISwap[];
}

const TransactionTable = ({ data = [] }: TransactionTableProps) => {
  const { sortedData, handleSortChange, sortConfig } = useTableSort({ data });
  const { width } = useWindowSize();

  const [dateNow, setDateNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(Math.floor(Date.now() / 1000));
    }, RefetchInterval.FAST);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Flex $direction={'column'} $gap={20}>
        <TableTitle>Transaction</TableTitle>
        <TableWrapper role='table'>
          {width > NumberBreakpoints.md && (
            <div role='rowgroup'>
              <TableHead role='row'>
                {/* <SortSelector text='Date' value={SortType.NONE} id='date-header' disabled /> */}
                <SortSelector
                  text='Date'
                  value={sortConfig.key === 'blockTimestamp' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('blockTimestamp')}
                  id='type-header'
                />
                <SortSelector
                  text='Type'
                  value={sortConfig.key === 'type' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('type')}
                  id='type-header'
                />
                <SortSelector
                  text='Amount'
                  value={sortConfig.key === 'amount' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('amount')}
                  id='amount-header'
                />
                <SortSelector
                  text='Price'
                  value={sortConfig.key === 'price' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('price')}
                  id='price-header'
                />
                <SortSelector
                  text='TXN'
                  value={sortConfig.key === 'transactionHash' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('transactionHash')}
                  id='txn-header'
                />
              </TableHead>
            </div>
          )}

          {data.length > 0 ? (
            <TableBody role='rowgroup'>
              {sortedData.map((transaction, index) => (
                <TableItem key={index} role='row'>
                  <Flex $align='center' $justify='space-between' role='cell' aria-labelledby='date-header'>
                    {width < NumberBreakpoints.md && <Title aria-hidden='true'>Date</Title>}
                    <Text>{formatTimeAgo(transaction.blockTimestamp, dateNow)}</Text>
                  </Flex>

                  <Flex $align='center' $justify='space-between' role='cell' aria-labelledby='type-header'>
                    {width < NumberBreakpoints.md && <Title aria-hidden='true'>Type</Title>}
                    <Text style={{ color: `${transaction.type === 'sell' ? 'var(--error-clr)' : '#34C759'}`, textTransform: 'capitalize' }}>
                      {transaction.type}
                    </Text>
                  </Flex>

                  <Flex $justify='space-between' role='cell' aria-labelledby='amount-header'>
                    {width < NumberBreakpoints.md && <Title aria-hidden='true'>Amount</Title>}
                    <Text>{`${formatNumber(formatEther(BigInt(transaction?.amount)))}`}</Text>
                  </Flex>

                  <Flex $justify='space-between' role='cell' aria-labelledby='price-header'>  
                    {width < NumberBreakpoints.md && <Title aria-hidden='true'>Price</Title>}
                    <Text>{`$${formatNumber(transaction.price)}`}</Text>
                  </Flex>

                  <Flex $justify='space-between' role='cell' aria-labelledby='txn-header'>
                    {width < NumberBreakpoints.md && <Title aria-hidden='true'>TXN</Title>}
                    <CommonLink
                      variants={LinkVariants.CLEAR}
                      isExternal
                      href={`${ExternalLinks.SONIC_SCANER}/tx/${transaction.transactionHash}`}
                      style={{width: '100%', justifyContent: width < NumberBreakpoints.md ?  'flex-end' : 'space-between', gap: '4px'}}
                    >
                      <Text>{formatAddress(transaction.transactionHash)}</Text>
                      <ExternalLinkIcon />
                    </CommonLink>
                  </Flex>
                </TableItem>
              ))}
            </TableBody>
          ) : (
            <Text style={{ textAlign: 'center', padding: '20px 0' }}>No transactions found</Text>
          )}
        </TableWrapper>
      </Flex>
    </Box>
  );
};

export default memo(TransactionTable);
