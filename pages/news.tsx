import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
	renderMetaTags,
	useQuerySubscription,
	StructuredText,
	Image,
} from 'react-datocms';
import TimeAgo from 'react-timeago';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import getAllNews from '@lib/queries/getAllNews';
import getAllFragments from '@lib/queries/getAllFragments';
import { fetchFromDatoCms } from '@lib/datocms';
import InformationBar from '@components/InformationBar';
import PreviewBar from '@components/PreviewBar';
import PageHeader from '@components/PageHeader';
import PageFooter from '@components/PageFooter';
import Article from '@components/Article';

interface Props {
	subscription: any;
	siteData: any;
	preview?: boolean;
}

const News: React.FC<Props> = ({ subscription, siteData, preview }) => {
	const { data, error, status } = useQuerySubscription(subscription);

	return (
		<>
			{preview && <PreviewBar realtimeStatus={status} error={error} />}
			{siteData?.informationBar && (
				<InformationBar informationBar={siteData.informationBar} />
			)}
			{siteData?.pageHeader && (
				<PageHeader
					pageHeader={siteData.pageHeader}
					menu={siteData.allPages}
				/>
			)}

			<div className="px-10 py-12 text-gray-700 bg-gray-100 body-font">
				<div className="mx-auto my-12 max-w-screen-sm">
					<div className="mb-8 prose">
						<h1>News</h1>
					</div>

					{data?.allNews && (
						<TransitionGroup>
							{data.allNews.map((news: any) => (
								<CSSTransition
									key={news.id}
									classNames={{
										enter: 'post-enter',
										enterActive: 'post-enter-active',
										exit: 'post-exit',
										exitActive: 'post-exit-active',
									}}
									timeout={{ enter: 1200, exit: 1200 }}
								>
									<div>
										<div className="overflow-hidden bg-white rounded-lg shadow-xl">
											{news.content && (
												<div className="p-4 md:p-8 md:text-xl content">
													<StructuredText
														data={news.content}
													/>
												</div>
											)}
										</div>
										<div className="items-center pb-12 mt-4 text-xs text-gray-500 grid grid-cols-2 md:text-sm md:px-8">
											<div className="flex items-center">
												<Image
													className="w-6 h-6 mr-2 rounded-full shadow"
													data={
														news.author.avatar
															.responsiveImage
													}
												/>
												<div>{news.author.name}</div>
											</div>
											<div className="text-right">
												<TimeAgo
													date={
														news._firstPublishedAt
													}
												/>
											</div>
										</div>
									</div>
								</CSSTransition>
							))}
						</TransitionGroup>
					)}
				</div>
			</div>
			{siteData?.pageFooter && (
				<PageFooter pageFooter={siteData.pageFooter} noMargin={true} />
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const graphqlRequest = {
		query: getAllNews,
		preview: context?.preview || false,
	};

	return {
		props: {
			subscription: {
				...graphqlRequest,
				initialData: await fetchFromDatoCms(graphqlRequest),
				token: process.env.DATOCMS_READ_ONLY_API_TOKEN,
			},
			siteData: await fetchFromDatoCms({
				query: getAllFragments,
				preview: false,
			}),
			preview: context?.preview || false,
		},
	};
};

export default News;
