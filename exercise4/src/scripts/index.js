"use strict";
const URL = "http://yapi.corp.qunar.com/mock/4569/jialil.li/info";
import fetchAsync from "../tool/server";

fetchAsync(URL)
	.then(data => {
        if(data.status){
            display(data.data);
        }
        else{
            display(data);
        }
	})
	.catch(error => {
		display(error);
	});

const display = function(data) {
	document.querySelector("p").textContent = JSON.stringify(data);
};
