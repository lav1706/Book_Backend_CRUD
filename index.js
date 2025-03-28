const express=require("express")
const app=express()
const Book=require("./models/books.models")
const {initializeDatabase} = require("./db/db.connect")
require("dotenv").config()
app.use(express.json())

initializeDatabase()
//add the book
const addBook=async(bookData)=>{
    try {
        const book= new Book(bookData)
        const saved= await book.save()
        return saved
    } catch (error) {
        console.log("Book is not added")
    }
}
app.post("/books",async(req,res)=>{
    try {
        const savedData=await addBook(req.body)
        if(savedData){
            res.status(200).json({message:"Book added Sucessfully",savedData})
        }
        else{
            res.status(404).json({message:"Book not added Sucessfully."})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to Add Book",error})
    }
})

//get ALL Books
const showBooks=async()=>{
    try {
        const data=await Book.find()
        return data
    } catch (error) {
        console.log("Failed to Show Book")
    }
}
app.get("/books",async(req,res)=>{
    try {
        const book=await showBooks()
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).json({message:"Book are not found"})
        }
        
    } catch (error) {
        res.status(500).json({message:"Failed to show books"})
    }
})
//find book by title
const findBookByFind=async(title)=>{
    try {
        const data=await Book.find({title:title})
        return data
        
    } catch (error) {
        console.log("Failed to find Book by title")
    }
}
app.get("/books/title/:title",async(req,res)=>{
    try {
        const data=await findBookByFind(req.params.title)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({message:"Book not found."})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in finding Book by title",error})
    }
})
//find by author
const findBookByAuthor=async(author)=>{
    try {
        const data=await Book.find({author:author})
        if(data){
            console.log("Book is found")
        }else{
            console.log("Book is not found")
        }
        return data
        
    } catch (error) {
        console.log("Failed to find Book by title")
    }
}
app.get("/books/author/:author",async(req,res)=>{
    try {
        const data=await findBookByAuthor(req.params.author)
        if(data){
            res.status(200).json({message:"Book found",data})
        }else{
            res.status(404).json({message:"Book not found."})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in finding Book by title".error})
    }
})
//find by genere
const findByGenre=async(genre)=>{
    try {
        const data=await Book.find({genre:genre})
        if(data){
            console.log("Book Found by Genre")
        }else{
            console.log("Book is not Found by Genre")
        }
        return data
        
    } catch (error) {
        console.log("Error in Find book by genre")
    }
}
app.get("/books/genre/:genre",async(req,res)=>{
    try {
        const data= await findByGenre(req.params.genre)
        if(data){
            res.status(200).json({data})

        }else{
            res.status(404).json({message:"Book not found"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in finding Book by Genre"})
    }
})

//find by Year
const findByYear=async(Year)=>{
    try {
        const data=await Book.find({publishedYear:Year})
        if(data){
            console.log("Book Found by Year")
        }else{
            console.log("Book is not Found by Year")
        }
        return data
        
    } catch (error) {
        console.log("Error in Find book by year")
    }
}
app.get("/books/publishedYear/:Year",async(req,res)=>{
    try {
        const data= await findByGenre(req.params.Year)
        if(data){
            res.status(200).json({message:"Book found Sucessfully",data})

        }else{
            res.status(404).json({message:"Book not found"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in finding Book by Year"})
    }
})

const updateBook=async(id,updateValue)=>{
    try {
        const data=await Book.findByIdAndUpdate({_id:id},updateValue,{new:true})
        if(data){
            console.log("Data Updated Sucessfully")
        }else{
            console.log("Data not found")
        }
        return data
    } catch (error) {
        console.log("Error in Updating Book")
    }
}
app.post("/books/update/:id",async(req,res)=>{
    try {
        const updatedData=await updateBook(req.params.id,req.body)
        if(updatedData){
            res.status(200).json({message:"Updated Data",updatedData:updatedData})
        }else{
            res.status(404).json({message:"Book not found"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in updating Book",error})
    }
})
//update by Year
const updateBookByYear=async(year,updateValue)=>{
    try {
        const data=await Book.findByIdAndUpdate({publishedYear:year},updateValue,{new:true})
        if(data){
            console.log("Data Updated Sucessfully")
        }else{
            console.log("Data not found")
        }
        return data
    } catch (error) {
        console.log("Error in Updating Book")
    }
}
app.post("/books/year/:year",async(req,res)=>{
    try {
        const updatedData=await updateBook(req.params.id,req.body)
        if(updatedData){
            res.status(200).json({message:"Updated Data",updatedData:updatedData})
        }else{
            res.status(404).json({message:"Book not found"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in updating Book",error})
    }
})

//delete Book
const deleteBook=async(id)=>{
    try {const data=Book.findByIdAndDelete(id)
        if(data){
            console.log("Data deleted Sucessfully")
        }else{
            console.log("Data not deleted Sucessfully")
        }
        return data
    } catch (error) {
        console.log("Error in deleting Data")
    }
}
app.delete("/books/:id",async(req,res)=>{
    try {
        const data=deleteBook(req.params.id)
        if(data){
            res.status(200).json({message:"Book deleted Sucessfully",data:data})
        }else{
            res.status(404).json({message:"Book not found"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in deleting Book"})
    }
})


const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log("Server is connected")
})