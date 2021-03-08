import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import {
	getAllPages,
	getMenu,
	getPageHeader,
	getPageFooter,
	getInformationBar,
} from '@lib/datocms';
import { Page } from '@lib/types';
import InformationBar from '@components/InformationBar';
import PreviewBar from '@components/PreviewBar';
import PageHeader from '@components/PageHeader';
import PageFooter from '@components/PageFooter';
import Article from '@components/Article';

interface Props {
	page: Page;
	site: any;
	menu: any;
	pageHeader: any;
	pageFooter: any;
	informationBar: any;
	preview?: boolean;
}

const ArticlePage: React.FC<Props> = ({
	page,
	site,
	menu,
	pageHeader,
	pageFooter,
	informationBar,
	preview,
}) => (
	<>
		<Head>{renderMetaTags(page.seo.concat(site.favicon))}</Head>
		{preview && <PreviewBar />}
		<InformationBar informationBar={informationBar} />
		<PageHeader pageHeader={pageHeader} menu={menu} />
		<Article page={page} />
		<PageFooter pageFooter={pageFooter} />
	</>
);

export const getStaticProps: GetStaticProps = async context => {
	const slug = context?.params?.slug;
	const { allPages, site } = await getAllPages(context.preview);
	const menu = await getMenu(context.preview);
	const pageHeader = await getPageHeader(context.preview);
	const pageFooter = await getPageFooter(context.preview);
	const informationBar = await getInformationBar(context.preview);

	const page = allPages.find((p: Page) => p.slug === slug) || null;

	if (!page) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			page,
			site,
			menu,
			pageHeader,
			pageFooter,
			informationBar,
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
