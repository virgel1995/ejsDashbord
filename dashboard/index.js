


module.exports.lunch = async (client) =>{
const express = require('express');
const app = express();
	const fs = require('fs')
const internetChecker = require('@root/internetChecker')
const { join, parse } = require("path")
let ejs = require('ejs');
// directory path
const dir = join(__dirname, 'views')

app.engine("html", require("ejs").renderFile) // Set the engine to html (for ejs template)
.set("view engine", "ejs")
.use(express.static(join(__dirname, "/public"))) // Set the css and js folder to ./public
.set("views", join(__dirname, "/views"))
	.set("port", client.config.DASHBOARD.PORT)



// list all files in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err
  }
// one route for main '/'
	app.get('/', (req, res) => {
  res.render('index')
});
  // files object contains all files names
  files.forEach(file => {
		//get all files from views 
    //console.log(parse(file).name)
	// make file as variable 
 let route = parse(file).name
	//make routs for all files without index 
	app.get(`/${route}`, (req, res) => {
  res.render(`${route}`)
});
		
  })
})



await internetChecker.Checker(client);
app.listen(app.get("port"), () => {
 client.logger.log('server started at ' + app.get("port") );
});


}