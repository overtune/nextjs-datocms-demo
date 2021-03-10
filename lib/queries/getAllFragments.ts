import { menuFragment } from './getMenu';
import { pageHeaderFragment } from './getPageHeader';
import { pageFooterFragment } from './getPageFooter';
import { informationBarFragment } from './getInformationBar';
import { siteMetaFragment } from './getSiteMeta';

export default /* GraphQL */ `
	{
		${menuFragment}
		${pageHeaderFragment}
		${pageFooterFragment}
		${informationBarFragment}
		${siteMetaFragment}
	}
`;
