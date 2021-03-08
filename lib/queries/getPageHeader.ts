export default /* GraphQL */ `
	{
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
	}
`;
