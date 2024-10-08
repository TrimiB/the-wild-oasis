import { useCabins } from './useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1. FILTER
  const filterValue = searchParams.get('discount') || 'all';

  const filteredCabins = cabins.filter((cabin) => {
    // if (filterValue === 'all') return cabins;
    if (filterValue === 'with-discount') return cabin.discount > 0;
    if (filterValue === 'no-discount') return cabin.discount === 0;

    return cabins;
  });

  // 2. SORT
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    return (aValue - bValue) * modifier;
  });

  return (
    <Menus>
      <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
        <Table.Header role='row'>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
