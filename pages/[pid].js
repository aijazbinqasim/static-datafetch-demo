import path from "path";
import fs from "fs/promises";

export default function Product(props) {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getResponse() {
  const filePath = path.join(process.cwd(), "data", "dumy-data.json");
  const json = await fs.readFile(filePath);
  const records = JSON.parse(json);

  return records;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const records = await getResponse();
  const product = records.products.find((p) => p.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const records = await getResponse();
  const ids = records.products.map((p) => p.id);
  const params = ids.map((pid) => ({ params: { pid: pid } }));

  return {
    paths: params,
    // paths: [
    //   { params: { pid: "p1" } },
    //   // { params: { pid: "p2" } },
    //   // { params: { pid: "p3" } },
    // ],
    fallback: true,
  };
}
