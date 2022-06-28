// const { renderAllRules } = require("./header");
import { renderAllRules } from "./header";
test("example test", () => {
    expect(1 + 2).toEqual(3);
})

test("render rules shows a Rules heading", () => {
    document.body.innerHTML = "<section id='page'<>/section>";
    renderAllRules
    const h3 = document.querySelectorAll('h3')
    expect(h3.length).toEqual(1)
});