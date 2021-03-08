import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { renderMetaTags, useQuerySubscription } from 'react-datocms';
import getPageQuery from '@lib/queries/getPage';
import { getAllPages } from '@lib/datocms';
import { Page } from '@lib/types';
import { fetchFromDatoCms } from '@lib/datocms';
import InformationBar from '@components/InformationBar';
import PreviewBar from '@components/PreviewBar';
import PageHeader from '@components/PageHeader';
import PageFooter from '@components/PageFooter';
import Article from '@components/Article';

interface Props {
	subscription: any;
	preview?: boolean;
}

const ArticlePage: React.FC<Props> = ({ subscription, preview }) => {
	const { data, error, status } = useQuerySubscription(subscription);

	return (
		<>
			{preview && <PreviewBar realtimeStatus={status} error={error} />}
			{data?.informationBar && (
				<InformationBar informationBar={data.informationBar} />
			)}
			{data?.pageHeader && (
				<PageHeader pageHeader={data.pageHeader} menu={data.allPages} />
			)}

			{data?.site && data?.page && (
				<Head>
					{renderMetaTags(
						data.page.seo.concat(data.site.favicon)
					)}
				</Head>
			)}
			{data?.page && <Article page={data.page} />}
			{data?.pageFooter && <PageFooter pageFooter={data.pageFooter} />}
		</>
	);
};

export const getStaticProps: GetStaticProps = async context => {
	const slug = context?.params?.slug;
	const graphqlRequest = {
		query: getPageQuery,
		variables: { slug },
		preview: context.preview,
	};

	return {
		props: {
			subscription: context.preview
				? {
						...graphqlRequest,
						initialData: await fetchFromDatoCms(graphqlRequest),
						token: process.env.DATOCMS_READ_ONLY_API_TOKEN,
				  }
				: {
						enabled: false,
						initialData: await fetchFromDatoCms(graphqlRequest),
				  },
			preview: context?.preview || false,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const { allPages } = await getAllPages();
	const slugs = allPages.map((p: Page) => ({ params: { slug: p.slug } }));

	return {
		paths: slugs,
		fallback: false,
	};
};

export default ArticlePage;
