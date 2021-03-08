import React from 'react';
import Link from 'next/link';
import { StructuredText } from 'react-datocms';

interface Props {
	pageFooter: any;
}

const renderColumn = (col: any) => (
	<div key={col.id} className="prose">
		{col.headline && <h2>{col.headline}</h2>}
		{col.links && <ul>{col.links.map(renderLink)}</ul>}
		{col.content && <StructuredText data={col.content} />}
	</div>
);

const renderLink = (link: any) => (
	<li key={link.id}>
		<Link href={`/${link.slug}`}>{link.title}</Link>
	</li>
);

const PageFooter: React.FC<Props> = ({ pageFooter }) => {
	return (
		<div className="py-12 mt-20 border-t-2 border-gray-100 bg-gray-50">
			<div className="container mx-auto">
				<div className="grid grid-cols-4 gap-4">
					{pageFooter.columns.map(renderColumn)}
				</div>
			</div>
		</div>
	);
};

export default PageFooter;