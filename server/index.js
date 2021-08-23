const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphQLschema } = require('./schemas/NewsSchema.js')
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/Ultimate-project");

const News = require("./models/newsModel");

/**
 * Remove the session from the sessionstorage 
 * and redirect the user to login
 */
 function removeSession(){
  sessionStorage.removeItem("usuarioActivo");
    window.location.href = "./index.html";
}

/**
 * Render sources by userID
 * @param {*} sources 
 */
function renderSources(sources) {
  let url = "http://localhost:3000/api/categories";
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    let html = `<table class="table table-responsive table-bordered">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>`;
    sources.forEach((source) => {
      taskResponse.forEach((categories) => {
        if (source.userID === usuario) {
          if (source.categoryID === categories._id) {
            html += `<thead class="thead-dark">
            </thead>
            <tbody>
              <tr>
                <td>${source.nameSource}</td>
                <td id="cat">${categories.nameCategory}</td>
                <td><a href="editnews.html?id=${source._id}&idCategory=${source.categoryID}">
                <button type="button" class="btn btn-success">Edit</button></a>
                <button onclick="deletesource('${source._id}')" type="button" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>`;
          }
        } else {
        }
      });
    });
    html += "</table>";
    document.getElementById("tableList").innerHTML = html;
  });

  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

/**
 * Delete sources by ID
 * @param {*} id 
 */
function deletesource(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/newsSources?id=${id}`);
  ajaxRequest.send();
  location.reload();
}

// functions

//Gets all news 
const getNews = () => {
  return News.find(function (err, news) {
    if (err) {
      return "There was an error"
    }
    return news;
  })
};

//Gets the news for UserID
const getNewsByUser = async (req) => {
  console.log(req);
  return News.find( {"user_id": req.user_id},function (err, news) {
    if (err) {
      return "There was an error"
    }
    return news;
  })
};

//Searches specific news
const searchNews = async (req) => {
  console.log(req);
  return News.find( {"user_id": req.user_id, "title": new RegExp(req.title, 'i')},function (err, news) {
    if (err) {
      return "There was an error"
    }
    return news;
  })
};

//Gets all news tasks
const tagsNews = async (req) => {
  console.log(req);
  return News.find( {"user_id": req.user_id, "tags": {$in: [req.tags] }},function (err, news) {
    if (err) {
      return "There was an error"
    }
    return news;
  })
};

//Creates all Products
const createProduct = async (req) => {
  const product = new Product();

  product.quantity = req.quantity;
  product.name = req.name;
  product.price = req.price;


  const guardar = await product.save();

  if(guardar){
    return product;
  }else{
    return "Error";
  }
}

// expose in the root element the different entry points of the
// graphQL service
const root = {
  //Queries
  news: (req) => getNewsByUser(req),
  searchNews: (req) => searchNews(req),
  tagsNews: (req) => tagsNews(req),
  //Mutations
  createProduct: (req) => createProduct(req)
};

// instance the expressJS app
const app = express();
// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

//one single endpoint different than REST
app.use('/graphql', graphqlHTTP({
  schema: graphQLschema,
  rootValue: root,
  graphiql: true, 
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
