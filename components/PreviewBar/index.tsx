import React from 'react';

interface Props {
	realtimeStatus: string;
	error: any;
}

const statusMessage = {
	connecting: 'Connecting to DatoCMS...',
	connected: 'Connected to DatoCMS, receiving live updates!',
	closed: 'Connection closed',
};

const getStatusColor = (status: string) => {
	switch (status) {
		case 'connecting':
			return 'bg-yellow-500';
		case 'connected':
			return 'bg-green-500';
		case 'closed':
			default:
			return 'bg-red-500';
	}
}

const PreviewBar: React.FC<Props> = ({ realtimeStatus, error }) => {
	return (
		<div className="p-4 text-white bg-gray-900">
			<div className="container justify-between mx-auto md:flex">
				<p className="mb-4 text-right md:mb-0 md:text-left">
					<a href="/api/exit-preview">Exit preview mode -&gt;</a>
				</p>
					<p className="flex items-center"><span className={`inline-block w-4 h-4 rounded-full mr-4 ${getStatusColor(realtimeStatus)}`}></span> {statusMessage[realtimeStatus]}</p>
			</div>
			<div className="container flex mx-auto text-right">
				{error && (
					<div>
						<h1>Error: {error.code}</h1>
						<div>{error.message}</div>
						{error.response && (
							<pre>{JSON.stringify(error.response, null, 2)}</pre>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default PreviewBar;
