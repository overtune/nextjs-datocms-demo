export default /* GraphQL */ `
	{
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
	}
`;
