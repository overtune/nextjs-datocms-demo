import React from 'react';
import { GetStaticProps } from 'next';
import { getStartpage, getMenu } from '@lib/dato';
import { Page } from '@lib/types';
import Menu from '@components/Menu';
import Article from '@components/Article';

interface Props {
	page: Page;
	menu: any;
}

const Home: React.FC<Props> = ({ page, menu }) => (
	<>
		<Article page={page} />
		<Menu menu={menu} />
	</>
);

export const getStaticProps: GetStaticProps = async context => {
	const page = await getStartpage(context.preview);
	const menu = await getMenu(context.preview);

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

export default Home;
