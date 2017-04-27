export default function decodeArticleContent(value) {
  // http://stackoverflow.com/questions/14695988/dom-exception-5-invalid-character-error-on-valid-base64-image-string-in-javascri
  //                                        ＼
  return decodeURIComponent(escape(atob(value.replace(/\s/g, ''))))
}
