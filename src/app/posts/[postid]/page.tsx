export default function PostDetail( { params } :  { params: { postid: string } } ) {
    return <div>Post: {params.postid}</div>
}