export const pageFooterFragment = /* GraphQL */ `
		pageFooter {
			columns {
				... on LinkBlockRecord {
					id
					headline
					links {
						id
						slug
						title
					}
				}
				... on ContentBlockRecord {
					id
					headline
					content {
						value
					}
				}
			}
		}
`;

export default /* GraphQL */ `
	{ ${pageFooterFragment} }
`;
