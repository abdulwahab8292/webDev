import axios from 'axios';

async function fetch() {
    const response = await axios.get("https://mocki.io/v1/7cd8a7ca-01cd-4a9f-931b-a2cd66b923cf")
    console.log(response.data);
}
fetch();