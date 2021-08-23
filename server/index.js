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



app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
