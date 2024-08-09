import express from "express"
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv"

const app = express();
env.config();
const port = 3000;
app.use(express.static("public"));
const api_key=process.env.API_KEY;
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.redirect("/random");
})
app.get("/random",async(req,res)=>{
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${api_key}`);
        const result_img = response.data.urls.regular;
        const alt = response.data.alt_description;
        
        res.render("index.ejs",{
            image:result_img,
            alternative:alt,
            bool:false,
            photo_array1:[],
            photo_array2:[],
            photo_array3:[]
        })
    } catch (error) {
        console.error("failed to make request",error.message);
        res.render("index.ejs", {
            photo_array1: [],
            photo_array2: [],
            photo_array3: [],
            image: "https://cdn.pixabay.com/photo/2016/04/24/22/30/monitor-1350918_1280.png",
            bool: false,
            alternative: "",
            err: "Failed to fetch data"
        });
    }
})

app.post("/search",async (req,res)=>{
    try {
        const query = req.body.searchInput;

        const response1 = await axios.get(`https://api.unsplash.com/search/photos?client_id=${api_key}&page=1&query=${query}`);
        const photo_list1 = response1.data.results;
        const response2 = await axios.get(`https://api.unsplash.com/search/photos?client_id=${api_key}&page=2&query=${query}`);
        const photo_list2 = response2.data.results;
        const response3 = await axios.get(`https://api.unsplash.com/search/photos?client_id=${api_key}&page=3&query=${query}`);
        const photo_list3 = response3.data.results;

        const cover = response1.data.results[0].urls.regular;

        res.render("index.ejs",{
            photo_array1:photo_list1,
            photo_array2:photo_list2,
            photo_array3:photo_list3,
            image:cover,
            bool:true,
            alternative:""
        })
    } catch (error) {
        console.error("failed to make request",error.message);
        res.render("index.ejs", {
            photo_array1: [],
            photo_array2: [],
            photo_array3: [],
            image: "https://cdn.pixabay.com/photo/2016/04/24/22/30/monitor-1350918_1280.png",
            bool: false,
            alternative: "",
            err: "Failed to fetch data"
        });
    }
})
app.get("/:name",async(req,res)=>{
    try {
        const query = req.params.name;

        const response1 = await axios.get(`https://api.unsplash.com/search/photos?client_id=${api_key}&page=1&query=${query}`);
        const photo_list1 = response1.data.results;
        const response2 = await axios.get(`https://api.unsplash.com/search/photos?client_id=${api_key}&page=2&query=${query}`);
        const photo_list2 = response2.data.results;
        const response3 = await axios.get(`https://api.unsplash.com/search/photos?client_id=${api_key}&page=3&query=${query}`);
        const photo_list3 = response3.data.results;

        const cover = response1.data.results[0].urls.regular;
        res.render("index.ejs",{
            photo_array1:photo_list1,
            photo_array2:photo_list2,
            photo_array3:photo_list3,
            image:cover,
            bool:true,
            alternative:""
        })
    } catch (error) {
        console.error("failed to make request",error.message);
        res.render("index.ejs", {
            photo_array1: [],
            photo_array2: [],
            photo_array3: [],
            image: "https://cdn.pixabay.com/photo/2016/04/24/22/30/monitor-1350918_1280.png",
            bool: false,
            alternative: "",
            err: "Failed to fetch data"
        });
    }
})

app.listen(port,()=>{
    console.log("server running on port: "+port);
})