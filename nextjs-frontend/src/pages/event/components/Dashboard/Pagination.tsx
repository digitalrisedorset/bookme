import React from "react";
import {usePagination} from "@/pages/event/hooks/usePagination";
import PaginationStyles from "@/pages/event/styles/PaginationStyles";
import Head from "next/head";
import Link from "next/link";

interface ListingProps {
    page: number
}

export const Pagination: React.FC<ListingProps> = ({page}: ListingProps) => {
    const { pageCount, count, error, loading, data } = usePagination();

    if (loading) return 'Loading...';
    if (error) return <>error</>;

    return (
        <PaginationStyles>
            <Head>
                <title>
                    Ismaa Booking - Page {page} of {pageCount}
                </title>
            </Head>
            <Link href={`/events/${page - 1}`} aria-disabled={page === 1}>
                ← Prev
            </Link>
            <p>
                Page {page} of {pageCount}
            </p>
            <p>{count} Items Total</p>
            <Link href={`/events/${page + 1}`} aria-disabled={page === pageCount}>
                >Next →
            </Link>
        </PaginationStyles>
    )
}