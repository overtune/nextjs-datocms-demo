export default /* GraphQL */ `
	{
		site: _site {
			favicon: faviconMetaTags {
				attributes
				content
				tag
			}
		}
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
	}
`;
