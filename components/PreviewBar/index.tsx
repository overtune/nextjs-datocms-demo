import React from 'react';

const PreviewBar: React.FC = () => {
	return (
		<div className="py-4 text-white bg-gray-900">
			<div className="container mx-auto text-right">
				<p><a href="/api/exit-preview">Exit preview mode -&gt;</a></p>
			</div>
		</div>
	);
};

export default PreviewBar;
