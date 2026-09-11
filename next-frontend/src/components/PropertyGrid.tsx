import Link from 'next/link';
import { SearchX } from 'lucide-react';
import type { PublicPropertyDto, PaginatedPropertiesResponse } from '@/types/property';
import PropertyCard from './PropertyCard';
import styles from './PropertyGrid.module.css';

interface PropertyGridProps {
  properties: PublicPropertyDto[];
  pagination?: PaginatedPropertiesResponse['pagination'];
  basePath?: string;
  preserveParams?: URLSearchParams;
  cols?: 3 | 4;
  emptyMessage?: string;
}

export default function PropertyGrid({
  properties,
  pagination,
  basePath = '/propiedades',
  preserveParams,
  cols = 3,
  emptyMessage = 'No encontramos propiedades con esos criterios. Ajustá los filtros y probá de nuevo.',
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>
          <SearchX size={27} strokeWidth={1.6} aria-hidden />
        </span>
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className={`${styles.grid} ${cols === 4 ? styles.gridCols4 : styles.gridCols3}`}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination pagination={pagination} basePath={basePath} preserveParams={preserveParams} />
      )}
    </div>
  );
}

function Pagination({
  pagination,
  basePath,
  preserveParams,
}: {
  pagination: PaginatedPropertiesResponse['pagination'];
  basePath: string;
  preserveParams?: URLSearchParams;
}) {
  const { page, totalPages, total } = pagination;

  const pageHref = (target: number) => {
    const params = preserveParams ? new URLSearchParams(preserveParams) : new URLSearchParams();
    params.set('page', String(target));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <nav aria-label="Paginación" className={styles.pagination}>
      <p className={styles.paginationInfo}>
        Página <strong>{page}</strong> de {totalPages} · {total} propiedades
      </p>

      <div className={styles.paginationButtons}>
        <Link
          href={pageHref(page - 1)}
          aria-disabled={page <= 1}
          className={`${styles.pageButton} ${page <= 1 ? styles.pageButtonDisabled : ''}`}
        >
          Anterior
        </Link>
        <Link
          href={pageHref(page + 1)}
          aria-disabled={page >= totalPages}
          className={`${styles.pageButton} ${page >= totalPages ? styles.pageButtonDisabled : ''}`}
        >
          Siguiente
        </Link>
      </div>
    </nav>
  );
}
