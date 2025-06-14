import React from "react";
import {usePagination} from "@/components/event/hooks/usePagination";
import PaginationStyles from "@/components/event/styles/PaginationStyles";
import Head from "next/head";
import Link from "next/link";
import {Loading} from "@/components/global/components/Loading";

interface ListingProps {
    page: number
}

export const Pagination: React.FC<ListingProps> = ({page}: ListingProps) => {
    const { pageCount, count, error, loading } = usePagination();

    if (loading) return <Loading />
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
                &gt;Next →
            </Link>
        </PaginationStyles>
    )
}