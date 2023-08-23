import { UserScreen } from '@/screens/UserScreen';

const UserPage = () => UserScreen({});

// export async function getStaticPaths() {
//     const res = await fetch('http://localhost:3001/api/users', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(''),
//       });
//     const user = await res.json()
   
//     return { user, fallback: false }
//   }
   
//   // This also gets called at build time
//   export async function getStaticProps({ params }) {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://.../posts/${params.id}`)
//     const post = await res.json()
   
//     // Pass post data to the page via props
//     return { props: { post } }
//   }

export default UserPage;
