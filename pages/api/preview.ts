export default async function preview(req, res) {
	if (req.query.secret !== process.env.DATOCMS_PREVIEW_SECRET) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	const slug = req.query.slug || '/';
	res.setPreviewData({});

	res.writeHead(307, { Location: slug });
	res.end();
}
