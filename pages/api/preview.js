export default (req, res) => {
	const slug = req.query.slug || '/';
	res.setPreviewData({});
	res.writeHead(307, { Location: slug });
	res.end();
};
