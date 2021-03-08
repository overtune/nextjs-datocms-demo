import React from 'react';
import Link from 'next/link';

interface Props {
	menu: any;
}

const renderMenuItem = (item: any) => (
	<li key={item.id} className="mr-8">
		<Link href={`/${item.slug}`}>{item.title}</Link>
			{/*item.children.length > 0 && (
			<ul>{item.children.map(renderMenuItem)}</ul>
		)*/}
	</li>
);

const Menu: React.FC<Props> = ({ menu }) => {
	if (!menu || menu.length === 0) {
		return null;
	}

	return (
		<nav aria-label="Menu" className="container px-4 mx-auto -mt-4 md:px-8 md:mt-0">
			<ul className="flex justify-start mb-4 text-lg font-medium md:mb-0 lg:text-2xl">
				{menu.map(renderMenuItem)}
			</ul>
		</nav>
	);
};

export default Menu;
