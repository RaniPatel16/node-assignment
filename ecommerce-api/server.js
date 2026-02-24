const express=require("express");
const cors=require("cors");
const app=express();
const port=3000;
app.use(cors());
app.use(express.json());
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];
// 1. GET /products


app.get("/products",(req,res)=>{
    res.status(200).json(products);
})
// 2. GET /products/:id


app.get("/products/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const product=products.find(p=>p.id===id);
  if(product){
    res.status(200).json(product);
  }else{
    res.student(404).json({message:"product not found"})

  }

})
// 3. GET /products/category/:categoryName


app.get("/products/category/:categoryName",(req,res)=>{
  const categoryName=req.params.categoryName;
  const filteredProducts=products.filter(
    p=>p.category.toLowerCase()===categoryName.toLowerCase()
  );
  res.status(200).json(filteredProducts);

});

// 4. POST /products

app.post("/products",(req,res)=>{
  const{name,category,price,stock,rating}=req.body;
  if(!name||!category||!price||!stock||!rating){
    return res.status(400).json({message:"missing required fields"});
  }

  const newproduct={
    id:products.length+1,
    name,
    category,
    price,
    stock,
    rating,
  }
  products.push(newproduct);
  res.status(201).json(newproduct);





})

// 5. PUT /products/:id


app.put("/products/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const product=products.find(p=>p.id===id);
  if(!product){
    return res.status(404).json({message:"product not found"});
  }
  const {name,category,price,stock,rating}=req.body;
  if(!name||!category||!price||!stock||!rating){
    return res.status(400).json({message:"missing required fields"});
  }
  const updatedProduct={
    id,
    name,
    category,
    price,
    stock,
    rating
  }
  const productIndex=products.findIndex(p=>p.id===id);
  products[productIndex]=updatedProduct;
  res.status(200).json(updatedProduct);

})


// 6. PUT /products/:id/stock

app.put("/products/:id/stock",(req,res)=>{
  const id=parseInt(req.params.id);
  const product=products.find(p=>p.id===id);
  if(!product){
    return res.status(404).json({message:"product not found"});
  }
  const {stock}=req.body;
  if(!stock){
    return res.status(400).json({message:"missing required fields"});
  }
  product.stock=stock;

  res.status(200).json(product);
})


// 7. PUT /products/:id/price
app.put("/products/:id/price",(req,res)=>{
  const id=parseInt(req.params.id);
  const product=products.find(p=>p.id===id);
  if(!product){
    return res.status(404).json({message:"product not found"});
  }
  const {stock}=req.body;
  if(!stock){
    return res.status(400).json({message:"missing required fields"});
  }
  product.stock=stock;
  res.status(200).json(product);

})


app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
});