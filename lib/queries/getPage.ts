import { menuFragment } from './getMenu';
import { pageHeaderFragment } from './getPageHeader';
import { pageFooterFragment } from './getPageFooter';
import { informationBarFragment } from './getInformationBar';
import { siteMetaFragment } from './getSiteMeta';

export default /* GraphQL */ `
query getPage($slug: String) {
  page(filter: {slug: {eq: $slug}}) {
			id
			title
			slug
			seo: _seoMetaTags {
				attributes
				content
				tag
			}
			content {
				value
				blocks {
					__typename
					... on ImageRecord {
						id
						image {
							responsiveImage(
								imgixParams: { fm: jpg, fit: crop, w: 1024 }
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
				links {
					__typename
					... on PageRecord {
						id
						title
						slug
						topImage {
							responsiveImage(
								imgixParams: {
									fm: jpg
									fit: crop
									minW: 100
									minH: 100
									maxW: 100
									maxH: 100
									w: 100
									h: 100
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
		${menuFragment}
		${pageHeaderFragment}
		${pageFooterFragment}
		${informationBarFragment}
		${siteMetaFragment}
	}
`;
