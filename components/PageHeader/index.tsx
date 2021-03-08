import React from 'react';
import Link from 'next/link';
import Menu from '@components/Menu';

interface Props {
	pageHeader: any;
	menu?: any;
}

const renderTopLink = (link: any) => (
	<li className="mr-4" key={link.id}>
		<Link href={`/${link.slug}`}>{link.title}</Link>
	</li>
);

const PageHeader: React.FC<Props> = ({ pageHeader, menu }) => {
	return (
		<div className="md:flex md:justify-between md:items-center">
			<Link href="/">
				<img src={pageHeader.logo.url} />
			</Link>
			{menu && <Menu menu={menu} />}
			{pageHeader.topLinks && (
				<nav aria-label="Service links" className="flex-shrink-0 hidden md:block">
					<ul className="flex justify-between pt-4">
						{pageHeader.topLinks.map(renderTopLink)}
					</ul>
				</nav>
			)}
		</div>
	);
};

export default PageHeader;
