export default /* GraphQL */ `
	{
		allNews {
			id
			title
			content {
				value
			}
			author {
				id
				name
				avatar {
					responsiveImage(imgixParams: { auto: [format], w: 60 }) {
						aspectRatio
						base64
						height
						sizes
						src
						srcSet
						width
						alt
						title
					}
				}
			}
			_firstPublishedAt
		}
	}
`;
