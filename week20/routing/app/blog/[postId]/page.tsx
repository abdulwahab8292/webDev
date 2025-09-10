import axios from "axios";

export default async function BlogPage({params}: {params: {postId: string}}) {
    const postId = (await params).postId;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const data = response.data;
    return (
        <ul>
            <li>{data.id}</li>
            <li>{data.title}</li>
            <li>{data.body}</li>
        </ul>
    );
}