import { Page } from '@lib/types';

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

export async function getStartpage(preview?: boolean): Promise<Page[]> {
	const data = await fetchCmsAPI(
		`
			{
				startpage {
					title
					content {
						value
						blocks {
							__typename
							... on ImageRecord {
								id
								image {
									responsiveImage(
										imgixParams: {
											fm: jpg
											fit: crop
											w: 1024
										}
									) {
										srcSet
										webpSrcSet
										sizes
										src
										width
										height
										aspectRatio
										alt
										title
										base64
									}
								}
							}
						}
					}
					topImage {
						responsiveImage(
							imgixParams: { fm: jpg, fit: crop, w: 1920, h: 500 }
						) {
							srcSet
							webpSrcSet
							sizes
							src
							width
							height
							aspectRatio
							alt
							title
							base64
						}
					}
				}
			}
		`,
		preview
	);

	return data.startpage;
}

export async function getAllPages(preview?: boolean): Promise<Page[]> {
	const data = await fetchCmsAPI(
		`
			{
				allPages {
					id
					title
					slug
					content {
						value
						blocks {
							__typename
							... on ImageRecord {
								id
								image {
									responsiveImage(
										imgixParams: {
											fm: jpg
											fit: crop
											w: 1024
										}
									) {
										srcSet
										webpSrcSet
										sizes
										src
										width
										height
										aspectRatio
										alt
										title
										base64
									}
								}
							}
						}
					}
					topImage {
						responsiveImage(
							imgixParams: { fm: jpg, fit: crop, w: 1920, h: 500 }
						) {
							srcSet
							webpSrcSet
							sizes
							src
							width
							height
							aspectRatio
							alt
							title
							base64
						}
					}
				}
			}
		`,
		preview
	);

	return data.allPages;
}

export async function getMenu(preview?: boolean): Promise<Page[]> {
	const data = await fetchCmsAPI(
		`
			{
				allPages(filter: { parent: { exists: false } }) {
					id
					title
					slug
					children {
						id
						title
						slug
						children {
							id
							title
							slug
							children {
								id
								title
								slug
							}
						}
					}
				}
			}
		`,
		preview
	);

	return data.allPages;
}
