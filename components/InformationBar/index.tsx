import React from 'react';

interface Props {
	informationBar: any;
}

const InformationBar: React.FC<Props> = ({ informationBar }) => {
	if (!informationBar?.information) {
		return null;
	}

	return (
		<div className="p-4 bg-red-400">
			<div className="container mx-auto">
				{informationBar.information}
			</div>
		</div>
	);
};

export default InformationBar;
