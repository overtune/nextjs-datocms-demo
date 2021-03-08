export const siteMetaFragment = /* GraphQL */ `
		site: _site {
			favicon: faviconMetaTags {
				attributes
				content
				tag
			}
		}
`;

export default /* GraphQL */ `
	{ ${siteMetaFragment} }
`;
