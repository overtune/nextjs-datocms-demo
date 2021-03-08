export default /* GraphQL */ `
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
`;
