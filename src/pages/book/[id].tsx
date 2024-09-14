import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

// 존재할 수 있는 경로를 리턴
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } }, // url parameter의 값은 문자열로 명시
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // paths에 명시되지 않은 경로로 접근할 경우 대체 설정
    fallback: false, // 존재하지 않는 경로의 요청은 Not Found 처리 
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
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
