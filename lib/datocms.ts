// import { Page } from '@lib/types';
import getStartpageQuery from './queries/getStartpage';
import getMenuQuery from './queries/getMenu';
import getAllPagesQuery from './queries/getAllPages';
import getPageHeaderQuery from './queries/getPageHeader';
import getPageFooterQuery from './queries/getPageFooter';
import getInformationBarQuery from './queries/getInformationBar';

const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;

async function fetchCmsAPI(
	query: string,
	preview?: boolean,
	{ variables }: { variables?: Record<string, any> } = {}
) {
	const endpoint = preview
		? `https://graphql.datocms.com/preview`
		: `https://graphql.datocms.com/`;

	const res = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${API_TOKEN}`,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const json = await res.json();
	if (json.errors) {
		// eslint-disable-next-line no-console
		console.error(JSON.stringify(json.errors));
		throw new Error('Failed to fetch API');
	}

	return json.data;
}

export async function getStartpage(preview?: boolean): Promise<any> {
	const data = await fetchCmsAPI(getStartpageQuery, preview);

	return data;
}

export async function getAllPages(preview?: boolean): Promise<any> {
	const data = await fetchCmsAPI(getAllPagesQuery, preview);

	return data;
}

export async function getMenu(preview?: boolean): Promise<any[]> {
	const data = await fetchCmsAPI(getMenuQuery, preview);

	return data.allPages;
}

export async function getPageHeader(preview?: boolean): Promise<any> {
	const data = await fetchCmsAPI(getPageHeaderQuery, preview);

	return data.pageHeader;
}

export async function getPageFooter(preview?: boolean): Promise<any> {
	const data = await fetchCmsAPI(getPageFooterQuery, preview);

	return data.pageFooter;
}

export async function getInformationBar(preview?: boolean): Promise<any> {
	const data = await fetchCmsAPI(getInformationBarQuery, preview);

	return data.informationBar;
}
