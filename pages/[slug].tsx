import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPages, getMenu } from '@lib/dato';
import { Page } from '@lib/types';
import Menu from '@components/Menu';
import Article from '@components/Article';

interface Props {
	page: Page;
	menu: any;
}

const ArticlePage: React.FC<Props> = ({ page, menu }) => (
	<>
		<Article page={page} />
		<Menu menu={menu} />
	</>
);

export const getStaticProps: GetStaticProps = async context => {
	const slug = context?.params?.slug;
	const pages = await getAllPages(context.preview);
	const menu = await getMenu(context.preview);

	const page = pages.find((p: Page) => p.slug === slug) || null;

	if (!page) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			page,
			menu,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await getAllPages();
	const slugs = pages.map((p: Page) => ({ params: { slug: p.slug } }));

	return {
		paths: slugs,
		fallback: false,
	};
};

export default ArticlePage;
