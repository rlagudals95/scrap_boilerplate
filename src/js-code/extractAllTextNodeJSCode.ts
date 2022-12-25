const extractAllTextNodeJSCode = `function extractTextNode() {
    return Array.from(document.body.getElementsByTagName("*") || [])
        .filter(elem => 
            elem.children.length === 0 &&
            elem.textContent &&
            !(elem instanceof HTMLScriptElement) &&
            !(elem instanceof HTMLStyleElement) &&
            !(elem.nodeName === 'NOSCRIPT')
        );
}`;

export default extractAllTextNodeJSCode;
