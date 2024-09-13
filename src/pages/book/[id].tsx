import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id; // !단언을 사용해 params가 존재함을 단언 <- 이 페이지는 url 파라미터가 있어야 접근할 수 있기 때문
  const book = await fetchOneBook(Number(id));
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // null 처리
  if (!book) return "도서의 정보를 불러올 수 없습니다.";

  const {
    // id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subtitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
