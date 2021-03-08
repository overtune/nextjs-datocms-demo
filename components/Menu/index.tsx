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
		<nav aria-label="Menu" className="container mx-auto">
			<ul className="flex justify-start text-2xl font-medium">
				{menu.map(renderMenuItem)}
			</ul>
		</nav>
	);
};

export default Menu;
