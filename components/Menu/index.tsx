import React from 'react';
import Link from 'next/link';

interface Props {
	menu: any;
}

const renderMenuItem = (item: any) => (
	<li key={item.id}>
		<Link href={`/${item.slug}`}>{item.title}</Link>
		{item.children.length > 0 && (
			<ul>{item.children.map(renderMenuItem)}</ul>
		)}
	</li>
);

const Menu: React.FC<Props> = ({ menu }) => {
	if (!menu || menu.length === 0) {
		return null;
	}

	return (
		<nav aria-label="Menu" className="prose lg:prose-xl container mx-auto px-4 pt-12">
			<ul>
				<li>
					<Link href="/">Startpage</Link>
				</li>
				{menu.map(renderMenuItem)}
			</ul>
		</nav>
	);
};

export default Menu;
