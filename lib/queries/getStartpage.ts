import { menuFragment } from './getMenu';
import { pageHeaderFragment } from './getPageHeader';
import { pageFooterFragment } from './getPageFooter';
import { informationBarFragment } from './getInformationBar';
import { siteMetaFragment } from './getSiteMeta';

export default /* GraphQL */ `
	{
		startpage {
			title
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
