import styles from './Content.module.css'

import Main from './pages/Main'
import {useEffect, useState} from "react";

function Content() {
    const [page, setPage] = useState(<Main/>)

    return (
      <>
        <article id={styles.content}>{page}</article>
      </>
    )
}

export default Content