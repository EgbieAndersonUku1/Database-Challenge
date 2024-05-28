const db = require("../database/db.js");


const select_categories = db.prepare(/*sql*/ `
  SELECT * FROM products
`);


const select_product_by_id = db.prepare(/*sql*/ `
    SELECT id, name FROM products WHERE id = ?
`);


const searchProductByName = db.prepare(/*sql*/ `
    SELECT id, name FROM products WHERE name LIKE ?
`);



const getNameAndDescriptionFromCategory = db.prepare(/*sql*/ `
    SELECT name AS category_name, description AS category_description FROM categories WHERE id = ?
`);



function listProducts() {
  const products = select_categories.all();
  // TODO
  // Add the challenge 5 here
  return select_categories.all();


}


function getProduct(id) {

    const product = select_product_by_id.get(id);

    if (product && product.id) {

         const category = getNameAndDescriptionFromCategory.get(product.id);
         Object.keys(category).forEach((key) => {
            product[key] = category[key];
         })
    
         return product;
    }
   
    return product;
};


function searchProducts(searchParameter) {

    const searchQuery = `%${searchParameter.toUpperCase()}%`;
    return searchProductByName.all(searchQuery);
};


module.exports = { 
    listProducts,
    getProduct,
    searchProducts,
 };

