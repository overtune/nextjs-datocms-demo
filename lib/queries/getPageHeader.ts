export const pageHeaderFragment = /* GraphQL */ `
		pageHeader {
			logo {
				url
			}
			topLinks {
				... on PageRecord {
					id
					title
					slug
				}
			}
		}
`;

export default /* GraphQL */ `
	{ ${pageHeaderFragment} }
`;
