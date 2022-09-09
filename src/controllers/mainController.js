const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = products.filter(product => product.category === "visited")
		let productsInsale = products.filter(product => product.category === "in-sale")
		return res.render('index', {productsInsale, productsVisited, toThousand})
	},
	search: (req, res) => {
		const {keywords} = req.query;
		let result = products.filter(product => product.name.toLowerCase().includes(keywords) || product.description.toLowerCase().includes(keywords));
		return res.render('results', {
			keywords, result, toThousand
		})
	},
};

module.exports = controller;
