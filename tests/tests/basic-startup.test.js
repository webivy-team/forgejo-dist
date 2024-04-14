import assert from "node:assert";
import test from "node:test";

import forgejo from "forgejo-dist"

test("Basic query", async () => {
  const server = await forgejo()
  assert((await fetch('http://localhost:3000/').then(res => res.ok)))
  server.stop();
})
