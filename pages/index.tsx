import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import {
	getStartpage,
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

const Home: React.FC<Props> = ({
	page,
	site,
	menu,
	pageHeader,
	pageFooter,
	informationBar,
	preview,
}) => {
	return (
		<>
			<Head>{renderMetaTags(page.seo.concat(site.favicon))}</Head>
			{preview && <PreviewBar />}
			<InformationBar informationBar={informationBar} />
			<PageHeader pageHeader={pageHeader} menu={menu} />
			<Article page={page} />
			<PageFooter pageFooter={pageFooter} />
		</>
	);
};

export const getStaticProps: GetStaticProps = async context => {
	const { startpage, site } = await getStartpage(context.preview);
	const menu = await getMenu(context.preview);
	const pageHeader = await getPageHeader(context.preview);
	const pageFooter = await getPageFooter(context.preview);
	const informationBar = await getInformationBar(context.preview);

	if (!startpage) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			page: startpage,
			site,
			menu,
			pageHeader,
			pageFooter,
			informationBar,
			preview: context?.preview || false,
		},
	};
};

export default Home;
