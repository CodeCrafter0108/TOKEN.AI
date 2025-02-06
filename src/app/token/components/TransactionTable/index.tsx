import { Flex } from '@/styles/global';
import SortSelector from '@/components/shared/SortSelector';
import { SortType } from '@/components/shared/SortSelector/types';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { TableHead, TableItem, TableWrapper, Text, Title, TableTitle, TableBody } from './styles';
import { Box } from '@/styles/global';
import { useTableSort } from '@/hooks/useTableSort';
import { useWindowSize } from '@/hooks/useWindowSize';
import { formatAddress, formatNumber } from '@/utils/formatters';
import { memo } from 'react';

const mockData = [
  {
    date: '40s ago',
    type: 'Buy',
    usd: 254.01,
    price: 0.01,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Sell',
    usd: 1004.01,
    price: 0.03,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Buy',
    usd: 1294.01,
    price: 1,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Sell',
    usd: 1214.01,
    price: 0.23,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Buy',
    usd: 254.01,
    price: 0.01,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Sell',
    usd: 1004.01,
    price: 0.03,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Buy',
    usd: 1294.01,
    price: 1,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Sell',
    usd: 1214.01,
    price: 0.23,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Buy',
    usd: 254.01,
    price: 0.01,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Sell',
    usd: 1004.01,
    price: 0.03,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  },
  {
    date: '40s ago',
    type: 'Sell',
    usd: 1004.01,
    price: 0.03,
    txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72'
  }
];

const TransactionTable = () => {
  const { sortedData, handleSortChange, sortConfig } = useTableSort({ data: mockData });
  const { width } = useWindowSize();
  return (
    <Box>
      <Flex $direction={'column'} $gap={20}>
        <TableTitle>Transaction</TableTitle>
        <TableWrapper role='table'>
          {width > NumberBreakpoints.md && (
            <div role='rowgroup'>
              <TableHead role='row'>
                <SortSelector text='Date' value={SortType.NONE} id='date-header' disabled />
                <SortSelector
                  text='Type'
                  value={sortConfig.key === 'type' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('type')}
                  id='type-header'
                />
                <SortSelector
                  text='USD'
                  value={sortConfig.key === 'usd' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('usd')}
                  id='usd-header'
                />
                <SortSelector
                  text='Price'
                  value={sortConfig.key === 'price' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('price')}
                  id='price-header'
                />
                <SortSelector
                  text='TXN'
                  value={sortConfig.key === 'txn' ? sortConfig.direction : SortType.NONE}
                  onChange={() => handleSortChange('txn')}
                  id='txn-header'
                />
              </TableHead>
            </div>
          )}

          <TableBody role='rowgroup'>
            {sortedData.map((transaction, index) => (
              <TableItem key={index} role='row'>
                <Flex $align='center' $justify='space-between' role='cell' aria-labelledby='date-header'>
                  {width < NumberBreakpoints.md && <Title aria-hidden='true'>Date</Title>}
                  <Text>{transaction.date}.</Text>
                </Flex>

                <Flex $align='center' $justify='space-between' role='cell' aria-labelledby='type-header'>
                  {width < NumberBreakpoints.md && <Title aria-hidden='true'>Type</Title>}
                  <Text style={{ color: `${transaction.type === 'Buy' ? 'var(--accent-clr)' : 'var(--error-clr)'}` }}>
                    {transaction.type}
                  </Text>
                </Flex>

                <Flex $justify='space-between' role='cell' aria-labelledby='usd-header'>
                  {width < NumberBreakpoints.md && <Title aria-hidden='true'>USD</Title>}
                  <Text>{`$${formatNumber(transaction.usd)}`}</Text>
                </Flex>

                <Flex $justify='space-between' role='cell' aria-labelledby='price-header'>
                  {width < NumberBreakpoints.md && <Title aria-hidden='true'>Price</Title>}

                  <Text>{`$${formatNumber(transaction.price)}`}</Text>
                </Flex>

                <Flex $justify='space-between' role='cell' aria-labelledby='txn-header'>
                  {width < NumberBreakpoints.md && <Title aria-hidden='true'>TXN</Title>}
                  <Text>{formatAddress(transaction.txn)}</Text>
                </Flex>
              </TableItem>
            ))}
          </TableBody>
        </TableWrapper>
      </Flex>
    </Box>
  );
};

export default memo(TransactionTable);
