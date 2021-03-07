import React from 'react';
import { Image, StructuredText } from 'react-datocms';
import { Page } from '@lib/types';

interface Props {
	page: Page;
}

const Article: React.FC<Props> = ({ page }) => {
	const { title, content, topImage } = page;

	return (
		<article>
			<Image data={topImage.responsiveImage} />
			<div className="prose lg:prose-xl container mx-auto px-4 pt-12">
				<h1>{title}</h1>
				<StructuredText
					data={content}
					renderBlock={({ record }: { record: any }) => {
						switch (record.__typename) {
							case 'ImageRecord':
								return (
									<Image
										data={record.image.responsiveImage}
									/>
								);
							default:
								return null;
						}
					}}
				/>
			</div>
		</article>
	);
};

export default Article;
