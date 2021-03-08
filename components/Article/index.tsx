import React from 'react';
import { Image, StructuredText } from 'react-datocms';
import Link from 'next/link';
import { Page } from '@lib/types';

interface Props {
	page: Page;
}

const Article: React.FC<Props> = ({ page }) => {
	const { title, content, topImage } = page;

	return (
		<article>
			<Image data={topImage.responsiveImage} />
			<div className="container px-4 pt-12 mx-auto prose lg:prose-xl">
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
					renderInlineRecord={({ record }) => {
						switch (record.__typename) {
							case 'PageRecord':
								return (
									<div className="flex items-center">
										<Link href={`/${record.slug}`}>
											<Image
												data={
													record.topImage
														.responsiveImage
												}
												explicitWidth={true}
												pictureClassName="rounded-full"
												className="mr-4 no-img-margin"
											/>
										</Link>

										<Link href={`/${record.slug}`}>
											{record.title}
										</Link>
									</div>
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
