const db = require("../database/db.js");



const select_categories = db.prepare(/*sql*/ `
    SELECT  id, name, category_id, quantity_per_unit, Format(unit_price, 2), units_in_stock, units_on_order,
    Format(unit_price * units_in_stock, 2) AS stock_value
    FROM 
    Products;
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

