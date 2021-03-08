import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { renderMetaTags, useQuerySubscription } from 'react-datocms';
import getStartpageQuery from '@lib/queries/getStartpage';
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

const Home: React.FC<Props> = ({ subscription, preview }) => {
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

			{data?.site && data?.startpage && (
				<Head>
					{renderMetaTags(
						data.startpage.seo.concat(data.site.favicon)
					)}
				</Head>
			)}
			{data?.startpage && <Article page={data.startpage} />}
			{data?.pageFooter && <PageFooter pageFooter={data.pageFooter} />}
		</>
	);
};

export const getStaticProps: GetStaticProps = async context => {
	const graphqlRequest = {
		query: getStartpageQuery,
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

export default Home;
