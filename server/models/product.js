const db = require('../util/database');

module.exports = class Prodcut {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    
    edit() {
        return db.execute('UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE products.id = ?',
        [this.title, this.price, this.description, this.imageUrl, this.id]);
    };

    save() {
        return db.execute('INSERT INTO products(title, price, description, imageUrl) VALUES(?, ?, ?, ?)'
        , [this.title, this.price, this.description, this.imageUrl]);
        // getProductFromFile(products => {
        //     if (this.id){
        //         const pos = products.findIndex(p => p.id === this.id);
        //         products[pos] = this;
        //         fs.writeFile(p , JSON.stringify(products), err => {
        //             console.log(err);
        //         });
        //     }else{
        //         this.id = Math.random().toString();
        //         products.push(this);
        //         fs.writeFile(p , JSON.stringify(products), err => {
        //             console.log(err);
        //         });
        //     }
        // });
    };
    // static fetchAll(cb) {
    //     const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
    //     fs.readFile(p, (err, fileContent) => {
    //         if (err)
    //             cb([]); 
    //         cb(JSON.parse(fileContent));
    //     });
    // }
    static fetchAll(cb) {
        return db.execute('SELECT * FROM products');
        // getProductFromFile(cb);
    };
    
    static FindById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
        // getProductFromFile(products => {
        //     const product = products.find(p => p.id === id);
        //     cb(product);
        // });
    };
    static delete(id){
        return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
        // getProductFromFile(products => {
        //     // Get all element of an object excepte for the one who have the same productId
        //     const updateProduct = products.filter(p => p.id !== id);
        //     fs.writeFile(p , JSON.stringify(updateProduct), err => {
        //         console.log(err);
        //     });
        // });
    }
}