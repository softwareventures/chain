import test from "ava";
import chain from "./index";

test("value", t => t.is(chain("giraffe").value, "giraffe"));
test("map", t => t.is(chain("guinness")
    .map(s => s.replace(/u|ne|ss/g, ""))
    .value, "gin"));
test("then", t =>
    t.is(chain(123)
        .then(n => chain(456)
            .map(m => n + m))
        .value, 579));