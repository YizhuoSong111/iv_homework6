// src/pages/index.js
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/assignment6_Yizhuo_Song', // 将根目录重定向到 /123
      permanent: false,    // 非永久重定向
    },
  };
}

export default function Index() {
  return null; // 根页面内容为空
}