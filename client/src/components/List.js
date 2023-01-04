import { MdContentCopy } from 'react-icons/md';

export const List = ({ item, copyTextToClipboard }) => {
  const forms = ['nimetav', 'omastav', 'osastav'];

  return (
    <>
      {forms.map((form) => {
        return (
          <article key={form} className="item">
            <p className="title">
              {form}: <span>{item[form]}</span>
            </p>
            <div className="btn-container">
              <button
                type="button"
                className="copy-btn"
                onClick={() => copyTextToClipboard(item[form])}
              >
                <MdContentCopy />
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
};
