import ABB from '@/data/club.json';
import allCategories from '@/data/categories.json';
import MainSection from '@/components/layouts/MainSection';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import PriceTable from '@/components/ui/price-table';
import { PriceDoc } from '@/components/ui/price-doc';
import H2 from '@/components/ui/h2';

export const metadata = {
  title: "Tarifs d'inscription | Argenteuil Basketball",
  description: "Découvrez les tarifs d'inscription au club de basket d'Argenteuil.",
  openGraph: {
    title: "Tarifs d'inscription - Argenteuil Basketball",
    description: "Découvrez les tarifs d'inscription au club de basket d'Argenteuil.",
  },
};

// Row Component
type TarifRowProps = {
  categorie: {
    year: string[];
    division: string;
    rate: number;
  };
};

const TarifRow = ({ categorie }: TarifRowProps) => {
  return (
    <TableRow className='border-b'>
      <TableCell className='p-4'>
        <span className='font-medium text-background'>{categorie.year.join(' - ')}</span>
      </TableCell>
      <TableCell className='p-4'>
        <span className='font-medium text-background'>{categorie.division}</span>
      </TableCell>
      <TableCell className='p-4 text-right'>
        <span className='font-medium text-background'>{categorie.rate}€</span>
      </TableCell>
    </TableRow>
  );
};

export default function TarifsPage() {
  return (
    <MainSection>
      <H2>Nos tarifs</H2>
      <div className={`transform transition-opacity duration-500 ease-in-out`}>
        <div className='overflow-x-auto rounded-lg bg-white shadow'>
          <Table className='min-w-full table-auto'>
            <TableHeader>
              <TableRow className='bg-primary text-white'>
                <TableCell className='p-4 text-left tracking-wider'>Je suis né(e) en</TableCell>
                <TableCell className='p-4 text-left tracking-wider'>Ma catégorie</TableCell>
                <TableCell className='p-4 text-right tracking-wider'>Tarif</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCategories.map((categorie) => (
                <TarifRow key={categorie.division} categorie={categorie} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainSection>
  );
}
