import React from 'react'
import "./Copyright.scss"

export const Copyright = () => {
  return (
    <div className="wrap copyright" >
      <h1 className="copyright__title">Copyright</h1>
      <div>Icons made by&nbsp;
        <a
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik">Freepik&nbsp;
        </a>
         from&nbsp;
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
      </div>


      <a
        target="_blank"
        href="https://icons8.ru/icons/set/prelum"
        rel="noopener noreferrer"
      >Muscles icons</a> made by&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://icons8.ru"
      >www.icons8.ru&nbsp;</a>

      <div>
        Spinner made by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://icons8.ru"
        >https://loading.io/</a>
      </div>
      <div>
        Hooks from
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://usehooks.com/"
        >https://usehooks.com/</a>
      </div>

    </div>
  )
}
