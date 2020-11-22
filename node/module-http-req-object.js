const http = require("http");
const url = require("url");

//helper function
const cap = (s)=>s.charAt(0).toUpperCase() + s.slice(1)

//pages content.
const home = `<h1>You are Home!</h1>`
const about = `<h1>About Us</h1>`
const contact = `<h1>Contact Us</h1>`
const _404 = '<h1>404 Error</h1><h2> There is nothing here</h2>'
//pages object
const pages = {home,about,contact}

//make link helper function
const makeLink = page=>`<a href="/?page=${page}">${cap(page)}</a>`

//makes the links
const navigation = () => Object.keys(pages).map(p=>makeLink(p)).join("")

//template for html
const content = (bodyContent)=>`
<!DOCTYPE html>
<html>
    <head><title>Req Module Demo 1</title></head>
    <body>
        <nav>
           ${navigation()}
        </nav>
        ${bodyContent}
    </body>
</html>
`

const server = http.createServer((req,res)=>{
    //parses the url to give us a query string object
    const query = url.parse(req.url, true).query
    res.statusCode = 200

    //set the page based on the query string
    page = pages[query.page ? query.page : "home"]
    //if there is no page send 404
    if(!page) {
        res.statusCode = 404;
        page = _404
    }

    //write the content to the response
    res.write(content(page))    
    res.end()
})

server.listen(5566,()=>{
    console.log(`Running on Port ${5566}`)
})