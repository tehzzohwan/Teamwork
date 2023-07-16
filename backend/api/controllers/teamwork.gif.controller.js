const db = require('../configs/db.configs');

const createGifsTable = async () => {
	await db.query('DROP TABLE IF EXISTS gif');
	await db.query(`CREATE TABLE IF NOT EXISTS gif (id SERIAL PRIMARY KEY, 
      title VARCHAR(200) NOT NULL, 
      image VARCHAR(2000) NOT NULL, 
      created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      user_id INT NOT NULL
     )`);
};

createGifsTable();

const createGif = async (req, res) => {
	const  { title, image } = req.body;
	const user_id = parseInt(req.user_id, 10);
    
	try {
		const insertGif = await db.query('INSERT INTO gif (title, image, user_id ) VALUES ($1, $2, $3) RETURNING *', [title, image, user_id]);
		if (insertGif.rows.length > 0) {
			return res.status(200).json({
				'status': 'success',
				'data': {
					'gif_id': insertGif.rows[0].id,
					'message': 'Gif image successfully posted',
					'created_on': insertGif.rows[0].created_on,
					'title': insertGif.rows[0].title,
					'image_url': insertGif.rows[0].image
				}
			});
		} else {
			return res.status(404).json({
				'status': 'error',
				'error': 'Failed! Please try again'
			});
		}
	} catch (err) {
		return res.status(400).json({
			'status': 'error',
			'error': err.message
		});
	}
};

const deleteGifById = async (req, res) => {
	const gifId = parseInt(req.params.gifId, 10);
	const user_id = req.user_id;

	try{
		const deleteGif = await db.query('DELETE FROM gif WHERE id = $1 AND user_id = $2 RETURNING *', [ gifId, user_id ]);
		if (deleteGif.rows.length > 0) {
			return res.status(200).json({
				'status': 'success',
				'data': {
					'message': 'Gif successfully deleted',
				} 
			});
		} else {
			return res.status(400).json({
				'status': 'error',
				'error': 'cannot find gif resource'
			});
		}
	} catch (err) {
		return res.status(500).json({
			'status': 'error',
			'error': err.message
		});
	}
};

const getAllGifs = async (req, res) => {
	try {
		const getGifs = await db.query('SELECT * FROM gif ORDER BY id ASC');
		if (getGifs.rows.length > 0) {
			return res.status(200).json({
				'status': 'success',
				'data': getGifs.rows
			});
		} else {
			return res.status(404).json({
				'status': 'error',
				'error': 'cannot find gifs'
			});
		}
	} catch (err) {
		return res.status(500).json({
			'status': 'error',
			'error': err.message
		});
	}
};

const getArticleById = async (req, res) => {
	const gifId = parseInt(req.params.articleId, 10);

	try {
		const getGif = await db.query('SELECT * FROM article WHERE id = $1', [gifId]);
		if (getGif.rows.length > 0) {
			return res.status(200).json({
				'status': 'success',
				'data': getGif.rows
			});
		} else {
			return res.status(404).json({
				'status': 'error',
				'error': 'cannot find article'
			});
		}
	} catch (err) {
		return res.status(500).json({
			'status': 'error',
			'error': err.message
		});
	}
};

module.exports = {
	createGif,
	deleteGifById,
	getAllGifs,
	getArticleById
};
